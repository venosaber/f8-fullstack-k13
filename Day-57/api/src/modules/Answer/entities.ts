import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @Column()
  exam_result_id: number;

  @Column()
  question_id: number;

  @Column()
  answer: string;

  @Column()
  is_correct: boolean;
}
