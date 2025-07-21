import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { TopicEntity } from '@/modules/topic/entities';
import { TopicServiceI } from '@/shares/type/services';

@Injectable()
export class TopicService
  extends BaseService<TopicEntity>
  implements TopicServiceI
{
  constructor(
    @Inject('TOPIC_REPOSITORY')
    protected repository: Repository<TopicEntity>,
  ) {
    super(repository);
  }
}
