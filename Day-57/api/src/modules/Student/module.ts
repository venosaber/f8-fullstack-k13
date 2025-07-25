import { Module } from '@nestjs/common';
import { StudentService } from './services';
import { StudentController } from './controllers';
import { UserModule } from '@/modules/User/module';
import { StudentServiceToken } from '@/shares';

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
