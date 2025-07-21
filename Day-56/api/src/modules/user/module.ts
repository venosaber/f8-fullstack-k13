import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { DatabaseModule } from '@/database/module';
import { userProviders } from '@/modules/user/providers';
import { UserServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    {
      provide: UserServiceToken,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
