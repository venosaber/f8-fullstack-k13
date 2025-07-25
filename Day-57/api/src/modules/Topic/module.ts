import { Module } from '@nestjs/common';
import { TopicController } from './controllers';
import { TopicService } from './services';
import { DatabaseModule } from '@/database/module';
import { topicProviders } from '@/modules/Topic/providers';
import { TopicServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicController],
  providers: [
    ...topicProviders,
    {
      provide: TopicServiceToken,
      useClass: TopicService,
    },
  ],
})
export class TopicModule {}
