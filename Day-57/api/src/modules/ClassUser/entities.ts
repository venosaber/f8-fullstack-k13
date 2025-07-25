import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('class_user')
export class ClassUserEntity extends BaseEntity {
  @Column()
  classId: number;

  @Column()
  userId: number;
}
