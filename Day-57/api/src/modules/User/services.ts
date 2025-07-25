import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { UserEntity } from '@/modules/User/entities';
import { UserServiceI, UserEntityRepository } from '@/shares';

@Injectable()
export class UserService
  extends BaseService<UserEntity>
  implements UserServiceI
{
  constructor(
    @Inject(UserEntityRepository)
    protected repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  protected getPublicColumns(): string[] {
    return super.getPublicColumns().filter((c: string) => c != 'password');
  }
}
