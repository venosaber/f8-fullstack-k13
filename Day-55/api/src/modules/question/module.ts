import { Module } from '@nestjs/common';
import { QuestionController } from './controllers';
import { QuestionService } from './services';
import { DatabaseModule } from '@/database/module';
import { questionProviders } from '@/modules/question/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController],
  providers: [...questionProviders, QuestionService],
})
export class QuestionModule {}
