import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('job')
export class JobEntity extends BaseEntity {
  @Column()
  name: string;
}
