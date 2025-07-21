import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { JobEntity } from '@/modules/job/entities';
import { JobServiceI } from '@/shares/type/services';

@Injectable()
export class JobService extends BaseService<JobEntity> implements JobServiceI {
  constructor(
    @Inject('JOB_REPOSITORY')
    protected repository: Repository<JobEntity>,
  ) {
    super(repository);
  }
}
