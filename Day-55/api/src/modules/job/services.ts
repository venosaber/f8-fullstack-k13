import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JobI, JobReqI } from '@/shares';

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_REPOSITORY')
    private jobRepository: Repository<JobI>,
  ) {}

  // GET all
  async get(): Promise<JobI[]> {
    return await this.jobRepository.find();
  }

  // POST (create)
  async create(payload: JobReqI): Promise<JobI> {
    const newJob: JobI = this.jobRepository.create(payload);
    return await this.jobRepository.save(newJob);
  }
}
