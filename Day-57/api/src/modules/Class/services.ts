import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { ClassEntity } from '@/modules/Class/entities';
import { ClassServiceI } from '@/shares/type/services';
import { ClassEntityRepository } from '@/shares';

@Injectable()
export class ClassService
  extends BaseService<ClassEntity>
  implements ClassServiceI
{
  constructor(
    @Inject(ClassEntityRepository)
    protected repository: Repository<ClassEntity>,
  ) {
    super(repository);
  }
}
