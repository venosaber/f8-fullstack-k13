import { DataSource } from 'typeorm';
import { JobEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const jobProviders = [
  {
    provide: 'JOB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(JobEntity),
    inject: [DATA_SOURCE],
  },
];
