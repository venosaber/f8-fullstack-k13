import type {
  AuthServiceI,
  UserServiceI,
  UserResI,
  LoginReqI,
  LoginResI,
  RegisterReqI,
} from '@/shares';
import { UserServiceToken, PasswordResetTokenRepository } from '@/shares';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetTokenEntity } from '@/modules/password_reset_token/entity';
import { Repository } from 'typeorm';
import type { MailServiceI } from '@/infrastructure/mail/interface';
import { MailServiceToken } from '@/infrastructure/mail/const';
import { ForgotPasswordReq, ResetPasswordReq } from '@/modules/auth/dtos';

@Injectable()
export class AuthService implements AuthServiceI {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserServiceToken)
    private readonly userService: UserServiceI,
    @Inject(PasswordResetTokenRepository)
    private readonly passwordResetTokenRepository: Repository<PasswordResetTokenEntity>,
    @Inject(MailServiceToken)
    private readonly mailService: MailServiceI,
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

  async forgotPassword(data: ForgotPasswordReq) {
    const { email } = data;
    const primaryResponse = {
      msg: 'If your email is registered, we have sent you an email with a link to reset your password.',
    };

    // find the user by email
    const user = await this.userService.findOneBy({ email });
    if (!user) return primaryResponse;

    // create token
    const payload = { sub: user.id, type: 'password_reset' };
    const token: string = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    // calculate the exp time
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // deactivate old tokens belong to the same user
    await this.passwordResetTokenRepository.update(
      { userId: user.id, isUsed: false },
      { isUsed: true },
    );

    // save token to the database
    await this.passwordResetTokenRepository.save({
      userId: user.id,
      token,
      expiresAt,
    });

    // send the email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.mailService.sendMail({
      to: [user.email],
      subject: `Request to change password`,
      html: `
          <h1>Request to change password</h1>
          <p>Hello ${user.name},</p>
          <p>We have received your request to change your password. 
          Please click on the link below to continue. 
          This link will be expired in 15 minutes.</p>
          <a href="${resetLink}" 
            style="padding: 10px 20px; color: white; background-color: #007bff; 
            text-decoration: none; border-radius: 5px;">
            Reset the password
            </a>
          <p>If you did not request to change your password, please ignore this email.</p>
      `,
    });

    return primaryResponse;
  }

  async resetPassword(data: ResetPasswordReq) {
    const { token, newPassword } = data;

    // find the corresponding token record in the db
    const tokenRecord = await this.passwordResetTokenRepository.findOneBy({
      token,
    });
    if (
      !tokenRecord ||
      tokenRecord.isUsed ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }

    // get the user
    const user = await this.userService.findOne(tokenRecord.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // hash password before saving
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(newPassword, saltRounds);
    // update the new password to the database
    await this.userService.updateOne(user.id, { password: hashedPassword });
    // mark the token as used
    tokenRecord.isUsed = true;
    await this.passwordResetTokenRepository.save(tokenRecord);

    // return the message
    return { msg: 'Successfully changed password' };
  }
}
