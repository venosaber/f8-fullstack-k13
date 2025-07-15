import { Module } from '@nestjs/common';
import { ClassUserController } from './controllers';
import { ClassUserService } from './services';
import { DatabaseModule } from '@/database/module';
import { classUserProviders } from '@/modules/class_user/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassUserController],
  providers: [...classUserProviders, ClassUserService],
})
export class ClassUserModule {}
