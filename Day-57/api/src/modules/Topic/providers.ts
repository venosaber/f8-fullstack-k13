import { DataSource } from 'typeorm';
import { TopicEntity } from './entities';
import { DATA_SOURCE, TopicEntityRepository } from '@/shares';

export const topicProviders = [
  {
    provide: TopicEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TopicEntity),
    inject: [DATA_SOURCE],
  },
];
