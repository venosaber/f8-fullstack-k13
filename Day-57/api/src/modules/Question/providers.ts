import { DataSource } from 'typeorm';
import { QuestionEntity } from './entities';
import { DATA_SOURCE, QuestionEntityRepository } from '@/shares';

export const questionProviders = [
  {
    provide: QuestionEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(QuestionEntity),
    inject: [DATA_SOURCE],
  },
];
