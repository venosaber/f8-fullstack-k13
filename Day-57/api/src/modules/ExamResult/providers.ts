import { DataSource } from 'typeorm';
import { ExamResultEntity } from './entities';
import { DATA_SOURCE, ExamResultEntityRepository } from '@/shares';

export const examResultProviders = [
  {
    provide: ExamResultEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamResultEntity),
    inject: [DATA_SOURCE],
  },
];
