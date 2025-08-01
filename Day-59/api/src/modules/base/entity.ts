import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  createdBy: number | null;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    type: 'bigint',
    nullable: true,
  })
  updatedBy: number | null;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  deletedBy: number | null;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;
}
