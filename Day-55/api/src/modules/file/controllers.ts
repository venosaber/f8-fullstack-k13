import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { FileService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { FileReq } from './dtos';
// import { FileResI } from '@/shares';

@ApiTags('Files')
@Controller('/files')
export class FileController {
  // dependency injection
  constructor(private fileService: FileService) {}

  @Get()
  get() {
    return this.fileService.get();
  }

  @Post()
  create(@Body() cls: FileReq) {
    return this.fileService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: FileReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
