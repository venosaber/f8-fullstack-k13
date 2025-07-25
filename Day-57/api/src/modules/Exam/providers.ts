import { DataSource } from 'typeorm';
import { ExamEntity } from './entities';
import { DATA_SOURCE, ExamEntityRepository } from '@/shares';

export const examProviders = [
  {
    provide: ExamEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamEntity),
    inject: [DATA_SOURCE],
  },
];
