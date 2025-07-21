import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('exam_group')
export class ExamGroupEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  class_id: number;

  @Column()
  start_time: Date;

  @Column()
  await_time: number;

  @Column()
  is_once: boolean;

  @Column()
  is_save_local: boolean;
}
