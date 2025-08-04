import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/module';
import { TeacherService } from '@/modules/teacher/service';
import { TeacherController } from '@/modules/teacher/controller';
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
