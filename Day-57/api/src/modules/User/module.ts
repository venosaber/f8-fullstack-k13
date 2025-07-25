import { Module } from '@nestjs/common';
import { UserService } from './services';
import { DatabaseModule } from '@/database/module';
import { UserServiceToken, UserEntityRepository, DATA_SOURCE } from '@/shares';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: UserEntityRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: UserServiceToken,
      useClass: UserService,
    },
  ],
  exports: [UserEntityRepository, UserServiceToken],
})
export class UserModule {}
