import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('exam_result')
export class ExamResultEntity extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  exam_id: number;

  @Column()
  status: string;

  @Column({ type: 'jsonb' })
  answers: object;

  @Column()
  number_of_correct_answer: number;

  @Column()
  score: number;
}
