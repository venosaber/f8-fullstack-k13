import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/controller';
import { UserModule } from '@/modules/user/module';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceToken } from '@/shares';
import { AuthService } from '@/modules/auth/service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServiceToken,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
