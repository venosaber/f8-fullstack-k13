import { Module } from '@nestjs/common';
import { ExamResultController } from './controllers';
import { ExamResultService } from './services';
import { DatabaseModule } from '@/database/module';
import { examResultProviders } from '@/modules/examResult/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamResultController],
  providers: [...examResultProviders, ExamResultService],
})
export class ExamResultModule {}
