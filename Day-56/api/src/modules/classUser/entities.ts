import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('classUser')
export class ClassUserEntity extends BaseEntity {
  @Column()
  classId: number;

  @Column()
  userId: number;
}
