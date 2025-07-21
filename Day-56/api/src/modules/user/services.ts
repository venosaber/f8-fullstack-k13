import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { UserEntity } from '@/modules/user/entities';
import { UserServiceI } from '@/shares/type/services';

@Injectable()
export class UserService
  extends BaseService<UserEntity>
  implements UserServiceI
{
  constructor(
    @Inject('USER_REPOSITORY')
    protected repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
