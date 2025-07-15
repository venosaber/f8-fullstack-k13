import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExamGroupI, ExamGroupReqI } from '@/shares';

@Injectable()
export class ExamGroupService {
  constructor(
    @Inject('EXAM_GROUP_REPOSITORY')
    private examGroupRepository: Repository<ExamGroupI>,
  ) {}

  // GET all
  async get(): Promise<ExamGroupI[]> {
    return await this.examGroupRepository.find();
  }

  // POST (create)
  async create(payload: ExamGroupReqI): Promise<ExamGroupI> {
    const newExamGroup: ExamGroupI = this.examGroupRepository.create(payload);
    return await this.examGroupRepository.save(newExamGroup);
  }
}
