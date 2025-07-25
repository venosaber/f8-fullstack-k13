import { Module } from '@nestjs/common';
import { TeacherService } from './services';
import { TeacherController } from './controllers';
import { UserModule } from '@/modules/User/module';
import { TeacherServiceToken } from '@/shares';

@Module({
  imports: [UserModule],
  controllers: [TeacherController],
  providers: [
    {
      provide: TeacherServiceToken,
      useClass: TeacherService,
    },
  ],
})
export class TeacherModule {}
