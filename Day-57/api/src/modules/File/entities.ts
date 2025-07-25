import { BaseEntity } from '@/modules/Base/entities';
import { Column, Entity } from 'typeorm';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column()
  url: string;

  @Column()
  key: string;
}
