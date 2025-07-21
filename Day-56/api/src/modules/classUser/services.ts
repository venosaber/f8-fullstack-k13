import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { ClassUserEntity } from '@/modules/classUser/entities';
import { ClassUserServiceI } from '@/shares/type/services';

@Injectable()
export class ClassUserService
  extends BaseService<ClassUserEntity>
  implements ClassUserServiceI
{
  constructor(
    @Inject('CLASS_USER_REPOSITORY')
    protected repository: Repository<ClassUserEntity>,
  ) {
    super(repository);
  }
}
