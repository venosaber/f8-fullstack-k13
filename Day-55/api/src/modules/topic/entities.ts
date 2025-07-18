import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('topic')
export class TopicEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  subject_id: number;

  @Column()
  code: number;
}
