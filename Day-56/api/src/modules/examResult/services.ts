import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { ExamResultEntity } from '@/modules/examResult/entities';
import { ExamResultServiceI } from '@/shares/type/services';

@Injectable()
export class ExamResultService
  extends BaseService<ExamResultEntity>
  implements ExamResultServiceI
{
  constructor(
    @Inject('EXAM_RESULT_REPOSITORY')
    protected repository: Repository<ExamResultEntity>,
  ) {
    super(repository);
  }
}
