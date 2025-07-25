import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @Column()
  exam_id: number;

  @Column()
  index: number;

  @Column()
  type: string;

  @Column()
  correct_answer: string;

  @Column()
  topic_id: number;
}
