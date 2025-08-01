import type {
  AuthServiceI,
  UserServiceI,
  UserResI,
  LoginReqI,
  LoginResI,
  RegisterReqI,
} from '@/shares';
import { UserServiceToken } from '@/shares';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthServiceI {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
  ) {}

  // register = create a new user
  async register(data: RegisterReqI) {
    // check if the email already exists
    const users: UserResI[] = await this.userService.find({
      email: data.email,
    });
    if (users.length > 0) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    // hash password before saving
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(data.password, saltRounds);
    const newUser = { ...data, password: hashedPassword };
    await this.userService.create(newUser);
    return { msg: 'Successfully registered' };
  }

  async login(data: LoginReqI): Promise<LoginResI> {
    // check if the email exists in the db
    const user = await this.userService.findUserByEmailWithPassword(data.email);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // exclude password from payload
    const { password: userPassword, ...payloadData } = user;
    // check if the password is correct
    const isPasswordMatching: boolean = await bcrypt.compare(
      data.password,
      userPassword,
    );
    if (!isPasswordMatching)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );

    // make new JWT tokens and return them
    const payload = { sub: user.id, data: payloadData };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
