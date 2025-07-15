import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExamResultI, ExamResultReqI } from '@/shares';

@Injectable()
export class ExamResultService {
  constructor(
    @Inject('EXAM_RESULT_REPOSITORY')
    private examResultRepository: Repository<ExamResultI>,
  ) {}

  // GET all
  async get(): Promise<ExamResultI[]> {
    return await this.examResultRepository.find();
  }

  // POST (create)
  async create(payload: ExamResultReqI): Promise<ExamResultI> {
    const newExamResult: ExamResultI =
      this.examResultRepository.create(payload);
    return await this.examResultRepository.save(newExamResult);
  }
}
