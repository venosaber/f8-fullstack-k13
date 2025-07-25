import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { JobEntity } from '@/modules/Job/entities';
import { JobServiceI } from '@/shares/type/services';
import { JobEntityRepository } from '@/shares';

@Injectable()
export class JobService extends BaseService<JobEntity> implements JobServiceI {
  constructor(
    @Inject(JobEntityRepository)
    protected repository: Repository<JobEntity>,
  ) {
    super(repository);
  }
}
