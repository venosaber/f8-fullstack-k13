import { Module } from '@nestjs/common';
import { ExamResultController } from './controllers';
import { ExamResultService } from './services';
import { DatabaseModule } from '@/database/module';
import { examResultProviders } from '@/modules/examResult/providers';
import { ExamResultServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamResultController],
  providers: [
    ...examResultProviders,
    {
      provide: ExamResultServiceToken,
      useClass: ExamResultService,
    },
  ],
})
export class ExamResultModule {}
