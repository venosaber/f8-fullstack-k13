import { Module } from '@nestjs/common';
import { StudentService } from './services';
import { StudentController } from './controllers';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
