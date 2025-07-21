import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { ExamGroupEntity } from '@/modules/examGroup/entities';
import { ExamGroupServiceI } from '@/shares/type/services';

@Injectable()
export class ExamGroupService
  extends BaseService<ExamGroupEntity>
  implements ExamGroupServiceI
{
  constructor(
    @Inject('EXAM_GROUP_REPOSITORY')
    protected repository: Repository<ExamGroupEntity>,
  ) {
    super(repository);
  }
}
