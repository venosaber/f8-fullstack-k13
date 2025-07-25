import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { SubjectEntity } from '@/modules/Subject/entities';
import { SubjectServiceI } from '@/shares/type/services';
import { SubjectEntityRepository } from '@/shares';

@Injectable()
export class SubjectService
  extends BaseService<SubjectEntity>
  implements SubjectServiceI
{
  constructor(
    @Inject(SubjectEntityRepository)
    protected repository: Repository<SubjectEntity>,
  ) {
    super(repository);
  }
}
