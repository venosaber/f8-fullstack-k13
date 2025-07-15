import { DataSource } from 'typeorm';
import { QuestionEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const questionProviders = [
  {
    provide: 'QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(QuestionEntity),
    inject: [DATA_SOURCE],
  },
];
