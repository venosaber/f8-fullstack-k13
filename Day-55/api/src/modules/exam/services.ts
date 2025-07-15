import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExamI, ExamReqI } from '@/shares';

@Injectable()
export class ExamService {
  constructor(
    @Inject('EXAM_REPOSITORY')
    private examRepository: Repository<ExamI>,
  ) {}

  // GET all
  async get(): Promise<ExamI[]> {
    return await this.examRepository.find();
  }

  // POST (create)
  async create(payload: ExamReqI): Promise<ExamI> {
    const newExam: ExamI = this.examRepository.create(payload);
    return await this.examRepository.save(newExam);
  }
}
