import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionI, QuestionReqI } from '@/shares';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<QuestionI>,
  ) {}

  // GET all
  async get(): Promise<QuestionI[]> {
    return await this.questionRepository.find();
  }

  // POST (create)
  async create(payload: QuestionReqI): Promise<QuestionI> {
    const newQuestion: QuestionI = this.questionRepository.create(payload);
    return await this.questionRepository.save(newQuestion);
  }
}
