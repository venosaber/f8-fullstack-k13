import { DataSource } from 'typeorm';
import { ExamGroupEntity } from './entities';
import { DATA_SOURCE, ExamGroupEntityRepository } from '@/shares';

export const examGroupProviders = [
  {
    provide: ExamGroupEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExamGroupEntity),
    inject: [DATA_SOURCE],
  },
];
