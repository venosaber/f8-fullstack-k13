import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnswerI, AnswerReqI } from '@/shares';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: Repository<AnswerI>,
  ) {}

  // GET all
  async get(): Promise<AnswerI[]> {
    return await this.answerRepository.find();
  }

  // POST (create)
  async create(payload: AnswerReqI): Promise<AnswerI> {
    const newAnswer: AnswerI = this.answerRepository.create(payload);
    return await this.answerRepository.save(newAnswer);
  }
}
