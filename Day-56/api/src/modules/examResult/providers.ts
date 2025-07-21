import { DataSource } from 'typeorm';
import { ExamResultEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const examResultProviders = [
  {
    provide: 'EXAM_RESULT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamResultEntity),
    inject: [DATA_SOURCE],
  },
];
