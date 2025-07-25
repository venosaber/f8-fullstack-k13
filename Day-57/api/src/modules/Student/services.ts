import { Injectable } from '@nestjs/common';
import { StudentReqI } from '@/shares';
import { UserService } from '@/modules/User/services';
import { UserEntity } from '@/modules/User/entities';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class StudentService extends UserService {
  protected handleWhere(
    query: SelectQueryBuilder<UserEntity>,
    condition: Partial<Record<keyof UserEntity, any>>,
  ): SelectQueryBuilder<UserEntity> {
    query = super.handleWhere(query, { ...condition, role: 'student' });
    return query;
  }

  async create(data: StudentReqI): Promise<any> {
    return super.create({ ...data, role: 'student' });
  }
}
