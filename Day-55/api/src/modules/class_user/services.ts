import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClassUserI, ClassUserReqI } from '@/shares';

@Injectable()
export class ClassUserService {
  constructor(
    @Inject('CLASS_USER_REPOSITORY')
    private classUserRepository: Repository<ClassUserI>,
  ) {}

  // GET all
  async get(): Promise<ClassUserI[]> {
    return await this.classUserRepository.find();
  }

  // POST (create)
  async create(payload: ClassUserReqI): Promise<ClassUserI> {
    const newClassUser: ClassUserI = this.classUserRepository.create(payload);
    return await this.classUserRepository.save(newClassUser);
  }
}
