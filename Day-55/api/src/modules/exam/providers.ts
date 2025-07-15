import { DataSource } from 'typeorm';
import { ExamEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const examProviders = [
  {
    provide: 'EXAM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamEntity),
    inject: [DATA_SOURCE],
  },
];
