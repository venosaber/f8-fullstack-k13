import { Module } from '@nestjs/common';
import { AnswerController } from './controllers';
import { AnswerService } from './services';
import { DatabaseModule } from '@/database/module';
import { answerProviders } from '@/modules/answer/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnswerController],
  providers: [...answerProviders, AnswerService],
})
export class AnswerModule {}
