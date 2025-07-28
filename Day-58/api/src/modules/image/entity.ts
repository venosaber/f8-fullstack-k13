import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  public_id: string;

  @Column({
    unique: true,
  })
  url: string;

  @Column()
  original_name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  file_type: string;

  @Column()
  size: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    default: false,
  })
  is_deleted: boolean;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
