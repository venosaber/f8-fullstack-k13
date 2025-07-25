import { DataSource } from 'typeorm';
import { ClassEntity } from './entities';
import { DATA_SOURCE, ClassEntityRepository } from '@/shares';

export const classProviders = [
  {
    provide: ClassEntityRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ClassEntity),
    inject: [DATA_SOURCE],
  },
];
