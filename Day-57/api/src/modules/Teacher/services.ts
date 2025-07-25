import { Injectable } from '@nestjs/common';
import { TeacherReqI } from '@/shares';
import { UserService } from '@/modules/User/services';
import { UserEntity } from '@/modules/User/entities';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class TeacherService extends UserService {
  protected handleWhere(
    query: SelectQueryBuilder<UserEntity>,
    condition: Partial<Record<keyof UserEntity, any>>,
  ): SelectQueryBuilder<UserEntity> {
    query = super.handleWhere(query, { ...condition, role: 'teacher' });
    return query;
  }

  async create(data: TeacherReqI): Promise<any> {
    return super.create({ ...data, role: 'teacher' });
  }
}
