import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { DatabaseModule } from '@/database/module';
import { userProviders } from '@/modules/user/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
