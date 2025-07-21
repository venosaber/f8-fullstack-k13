import { Module } from '@nestjs/common';
import { ClassUserController } from './controllers';
import { ClassUserService } from './services';
import { DatabaseModule } from '@/database/module';
import { classUserProviders } from '@/modules/classUser/providers';
import { ClassUserServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassUserController],
  providers: [
    ...classUserProviders,
    {
      provide: ClassUserServiceToken,
      useClass: ClassUserService,
    },
  ],
})
export class ClassUserModule {}
