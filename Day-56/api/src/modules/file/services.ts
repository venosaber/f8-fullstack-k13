import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '@/modules/base/services';
import { FileEntity } from '@/modules/file/entities';
import { FileServiceI } from '@/shares/type/services';

@Injectable()
export class FileService
  extends BaseService<FileEntity>
  implements FileServiceI
{
  constructor(
    @Inject('FILE_REPOSITORY')
    protected repository: Repository<FileEntity>,
  ) {
    super(repository);
  }
}
