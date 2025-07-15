import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubjectI, SubjectReqI } from '@/shares';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private subjectRepository: Repository<SubjectI>,
  ) {}

  // GET all
  async get(): Promise<SubjectI[]> {
    return await this.subjectRepository.find();
  }

  // POST (create)
  async create(payload: SubjectReqI): Promise<SubjectI> {
    const newSubject: SubjectI = this.subjectRepository.create(payload);
    return await this.subjectRepository.save(newSubject);
  }
}
