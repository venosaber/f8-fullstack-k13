import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('job')
export class JobEntity extends BaseEntity {
  @Column()
  name: string;
}
