import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('class_user')
export class ClassUserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
