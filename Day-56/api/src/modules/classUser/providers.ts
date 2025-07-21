import { DataSource } from 'typeorm';
import { ClassUserEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const classUserProviders = [
  {
    provide: 'CLASS_USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ClassUserEntity),
    inject: [DATA_SOURCE],
  },
];
