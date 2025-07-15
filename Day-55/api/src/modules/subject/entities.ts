import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('subject')
export class SubjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
