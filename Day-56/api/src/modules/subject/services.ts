import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { SubjectEntity } from '@/modules/subject/entities';
import { SubjectServiceI } from '@/shares/type/services';

@Injectable()
export class SubjectService
  extends BaseService<SubjectEntity>
  implements SubjectServiceI
{
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    protected repository: Repository<SubjectEntity>,
  ) {
    super(repository);
  }
}
