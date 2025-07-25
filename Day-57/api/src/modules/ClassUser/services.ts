import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { ClassUserEntity } from '@/modules/ClassUser/entities';
import { ClassUserEntityRepository } from '@/shares';

@Injectable()
export class ClassUserService extends BaseService<ClassUserEntity> {
  constructor(
    @Inject(ClassUserEntityRepository)
    protected repository: Repository<ClassUserEntity>,
  ) {
    super(repository);
  }
}
