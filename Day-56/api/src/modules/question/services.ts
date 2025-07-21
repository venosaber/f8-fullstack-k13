import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { QuestionEntity } from '@/modules/question/entities';
import { QuestionServiceI } from '@/shares/type/services';

@Injectable()
export class QuestionService
  extends BaseService<QuestionEntity>
  implements QuestionServiceI
{
  constructor(
    @Inject('QUESTION_REPOSITORY')
    protected repository: Repository<QuestionEntity>,
  ) {
    super(repository);
  }
}
