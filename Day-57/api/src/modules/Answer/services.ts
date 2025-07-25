import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { AnswerEntity } from '@/modules/Answer/entities';
import { AnswerServiceI } from '@/shares/type/services';
import { AnswerEntityRepository } from '@/shares';

@Injectable()
export class AnswerService
  extends BaseService<AnswerEntity>
  implements AnswerServiceI
{
  constructor(
    @Inject(AnswerEntityRepository)
    protected repository: Repository<AnswerEntity>,
  ) {
    super(repository);
  }
}
