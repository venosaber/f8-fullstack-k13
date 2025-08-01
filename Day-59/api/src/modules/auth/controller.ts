import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { type AuthServiceI, AuthServiceToken } from '@/shares';
import { LoginReq, RegisterReq } from './dtos';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceToken)
    private readonly authService: AuthServiceI,
  ) {}

  @Post('register')
  register(@Body() registerReq: RegisterReq) {
    return this.authService.register(registerReq);
  }

  @Post('login')
  login(@Body() loginReq: LoginReq) {
    return this.authService.login(loginReq);
  }
}
