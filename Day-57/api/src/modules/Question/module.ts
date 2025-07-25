import { Module } from '@nestjs/common';
import { QuestionController } from './controllers';
import { QuestionService } from './services';
import { DatabaseModule } from '@/database/module';
import { questionProviders } from '@/modules/Question/providers';
import { QuestionServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController],
  providers: [
    ...questionProviders,
    {
      provide: QuestionServiceToken,
      useClass: QuestionService,
    },
  ],
})
export class QuestionModule {}
