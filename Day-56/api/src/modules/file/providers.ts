import { DataSource } from 'typeorm';
import { FileEntity } from './entities';
import { DATA_SOURCE } from '@/shares';

export const fileProviders = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FileEntity),
    inject: [DATA_SOURCE],
  },
];
