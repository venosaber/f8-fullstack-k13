import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('exam')
export class ExamEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  exam_group_id: number;

  @Column()
  class_id: number;

  @Column()
  code: string;

  @Column()
  number_of_question: number;

  @Column()
  total_time: number;

  @Column({ type: 'jsonb' })
  correct_answer: object;

  @Column()
  description: string;

  @Column()
  device: string;
}
