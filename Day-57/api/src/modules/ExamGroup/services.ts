import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { ExamGroupEntity } from '@/modules/ExamGroup/entities';
import { ExamGroupServiceI } from '@/shares/type/services';
import { ExamGroupEntityRepository } from '@/shares';

@Injectable()
export class ExamGroupService
  extends BaseService<ExamGroupEntity>
  implements ExamGroupServiceI
{
  constructor(
    @Inject(ExamGroupEntityRepository)
    protected repository: Repository<ExamGroupEntity>,
  ) {
    super(repository);
  }
}
