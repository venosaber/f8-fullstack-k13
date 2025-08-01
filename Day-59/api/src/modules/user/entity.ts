import { BaseEntity } from '@/modules/base/entity';
import { Column, Entity } from 'typeorm';
import { Role } from '@/shares';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;

  @Column()
  password: string;
}
