import { Module } from '@nestjs/common';
import { TopicController } from './controllers';
import { TopicService } from './services';
import { DatabaseModule } from '@/database/module';
import { topicProviders } from '@/modules/topic/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicController],
  providers: [...topicProviders, TopicService],
})
export class TopicModule {}
