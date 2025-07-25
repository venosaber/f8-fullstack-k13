import { DataSource } from 'typeorm';
import { SubjectEntity } from './entities';
import { DATA_SOURCE, SubjectEntityRepository } from '@/shares';

export const subjectProviders = [
  {
    provide: SubjectEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [DATA_SOURCE],
  },
];
