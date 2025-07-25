import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/Base/services';
import { FileEntity } from '@/modules/File/entities';
import { FileServiceI } from '@/shares/type/services';
import { FileEntityRepository } from '@/shares';

@Injectable()
export class FileService
  extends BaseService<FileEntity>
  implements FileServiceI
{
  constructor(
    @Inject(FileEntityRepository)
    protected repository: Repository<FileEntity>,
  ) {
    super(repository);
  }
}
