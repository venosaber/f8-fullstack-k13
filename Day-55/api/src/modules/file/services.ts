import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FileI, FileReqI } from '@/shares';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<FileI>,
  ) {}

  // GET all
  async get(): Promise<FileI[]> {
    return await this.fileRepository.find();
  }

  // POST (create)
  async create(payload: FileReqI): Promise<FileI> {
    const newFile: FileI = this.fileRepository.create(payload);
    return await this.fileRepository.save(newFile);
  }
}
