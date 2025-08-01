import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@/shares';
import { UserEntity } from '@/modules/user/entity';
export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [UserEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
