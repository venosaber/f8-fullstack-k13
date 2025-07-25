import { DataSource } from 'typeorm';
import { JobEntity } from './entities';
import { DATA_SOURCE, JobEntityRepository } from '@/shares';

export const jobProviders = [
  {
    provide: JobEntityRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(JobEntity),
    inject: [DATA_SOURCE],
  },
];
