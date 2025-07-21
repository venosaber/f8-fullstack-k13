import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { ExamEntity } from '@/modules/exam/entities';
import { ExamServiceI } from '@/shares/type/services';

@Injectable()
export class ExamService
  extends BaseService<ExamEntity>
  implements ExamServiceI
{
  constructor(
    @Inject('EXAM_REPOSITORY')
    protected repository: Repository<ExamEntity>,
  ) {
    super(repository);
  }
}
