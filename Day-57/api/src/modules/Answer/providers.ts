import { DataSource } from 'typeorm';
import { AnswerEntity } from './entities';
import { DATA_SOURCE, AnswerEntityRepository } from '@/shares';

export const answerProviders = [
  {
    provide: AnswerEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AnswerEntity),
    inject: [DATA_SOURCE],
  },
];
