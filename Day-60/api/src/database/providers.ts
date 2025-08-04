import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@/shares';
import { UserEntity } from '@/modules/user/entity';
import { PasswordResetTokenEntity } from '@/modules/password_reset_token/entity';

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
        entities: [UserEntity, PasswordResetTokenEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
