import { BaseEntity } from '@/modules/base/entities';
import { Column, Entity } from 'typeorm';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column()
  url: string;

  @Column()
  key: string;
}
