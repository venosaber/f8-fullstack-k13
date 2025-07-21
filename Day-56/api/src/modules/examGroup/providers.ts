import { DataSource } from 'typeorm';
import { ExamGroupEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const examGroupProviders = [
  {
    provide: 'EXAM_GROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamGroupEntity),
    inject: [DATA_SOURCE],
  },
];
