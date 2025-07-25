import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { TopicEntity } from '@/modules/Topic/entities';
import { TopicServiceI } from '@/shares/type/services';
import { TopicEntityRepository } from '@/shares';

@Injectable()
export class TopicService
  extends BaseService<TopicEntity>
  implements TopicServiceI
{
  constructor(
    @Inject(TopicEntityRepository)
    protected repository: Repository<TopicEntity>,
  ) {
    super(repository);
  }
}
