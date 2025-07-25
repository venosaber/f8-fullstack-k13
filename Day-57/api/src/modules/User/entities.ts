import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column({ type: 'int', nullable: true })
  avatar: number | null;

  @Column()
  parent_name: string;

  @Column()
  parent_phone: string;
}
