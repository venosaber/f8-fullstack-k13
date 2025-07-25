import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { QuestionEntity } from '@/modules/Question/entities';
import { QuestionServiceI } from '@/shares/type/services';
import { QuestionEntityRepository } from '@/shares';

@Injectable()
export class QuestionService
  extends BaseService<QuestionEntity>
  implements QuestionServiceI
{
  constructor(
    @Inject(QuestionEntityRepository)
    protected repository: Repository<QuestionEntity>,
  ) {
    super(repository);
  }
}
