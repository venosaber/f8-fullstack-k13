import { Module } from '@nestjs/common';
import { ExamController } from './controllers';
import { ExamService } from './services';
import { DatabaseModule } from '@/database/module';
import { examProviders } from '@/modules/exam/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamController],
  providers: [...examProviders, ExamService],
})
export class ExamModule {}
