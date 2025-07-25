import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { ExamResultEntity } from '@/modules/ExamResult/entities';
import { ExamResultServiceI } from '@/shares/type/services';
import { ExamResultEntityRepository } from '@/shares';

@Injectable()
export class ExamResultService
  extends BaseService<ExamResultEntity>
  implements ExamResultServiceI
{
  constructor(
    @Inject(ExamResultEntityRepository)
    protected repository: Repository<ExamResultEntity>,
  ) {
    super(repository);
  }
}
