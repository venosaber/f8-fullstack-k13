import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/module';
import { StudentService } from '@/modules/student/service';
import { StudentServiceToken } from '@/shares';
import { StudentController } from '@/modules/student/controller';

@Module({
  imports: [UserModule],
  controllers: [StudentController],
  providers: [
    {
      provide: StudentServiceToken,
      useClass: StudentService,
    },
  ],
})
export class StudentModule {}
