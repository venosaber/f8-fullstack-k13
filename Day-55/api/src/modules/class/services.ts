import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClassI, ClassReqI } from '@/shares';

@Injectable()
export class ClassService {
  constructor(
    @Inject('CLASS_REPOSITORY')
    private classRepository: Repository<ClassI>,
  ) {}

  // GET all
  async get(): Promise<ClassI[]> {
    return await this.classRepository.find();
  }

  // POST (create)
  async create(payload: ClassReqI): Promise<ClassI> {
    const newClass: ClassI = this.classRepository.create(payload);
    return await this.classRepository.save(newClass);
  }
}
