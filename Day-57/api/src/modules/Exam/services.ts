import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { ExamEntity } from '@/modules/Exam/entities';
import { ExamServiceI } from '@/shares/type/services';
import { ExamEntityRepository } from '@/shares';

@Injectable()
export class ExamService
  extends BaseService<ExamEntity>
  implements ExamServiceI
{
  constructor(
    @Inject(ExamEntityRepository)
    protected repository: Repository<ExamEntity>,
  ) {
    super(repository);
  }
}
