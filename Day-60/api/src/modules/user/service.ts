import { BaseService } from '@/modules/base/service';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@/modules/user/entity';
import {
  UserEntityRepository,
  UserReqI,
  UserResI,
  UserServiceI,
} from '@/shares';
import { Repository } from 'typeorm';

@Injectable()
export class UserService
  extends BaseService<UserEntity, UserReqI, UserResI>
  implements UserServiceI
{
  constructor(
    @Inject(UserEntityRepository)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  protected getPublicColumns(): string[] {
    return super.getPublicColumns().filter((column) => column !== 'password');
  }

  async findUserByEmailWithPassword(email: string): Promise<UserEntity | null> {
    return await this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }
}
