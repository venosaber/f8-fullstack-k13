import { DataSource } from 'typeorm';
import { SubjectEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const subjectProviders = [
  {
    provide: 'SUBJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [DATA_SOURCE],
  },
];
