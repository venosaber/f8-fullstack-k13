import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserI, UserReqI } from '@/shares';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserI>,
  ) {}

  // GET all
  async get(): Promise<UserI[]> {
    return await this.userRepository.find();
  }

  // POST (create)
  async create(payload: UserReqI): Promise<UserI> {
    const newUser: UserI = this.userRepository.create(payload);
    return await this.userRepository.save(newUser);
  }
}
