import { Module } from '@nestjs/common';
import { ExamController } from './controllers';
import { ExamService } from './services';
import { DatabaseModule } from '@/database/module';
import { examProviders } from '@/modules/Exam/providers';
import { ExamServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamController],
  providers: [
    ...examProviders,
    {
      provide: ExamServiceToken,
      useClass: ExamService,
    },
  ],
})
export class ExamModule {}
