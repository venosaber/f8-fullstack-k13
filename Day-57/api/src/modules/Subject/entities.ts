import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('subject')
export class SubjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
