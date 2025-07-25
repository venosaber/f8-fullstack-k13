import { Module } from '@nestjs/common';
import { AnswerController } from './controllers';
import { AnswerService } from './services';
import { DatabaseModule } from '@/database/module';
import { answerProviders } from '@/modules/Answer/providers';
import { AnswerServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [AnswerController],
  providers: [
    ...answerProviders,
    {
      provide: AnswerServiceToken,
      useClass: AnswerService,
    },
  ],
})
export class AnswerModule {}
