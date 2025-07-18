import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('class')
export class ClassEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  code: string;

  @Column()
  subject_id: number;
}
