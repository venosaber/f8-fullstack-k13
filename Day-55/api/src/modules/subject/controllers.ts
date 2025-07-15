import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { SubjectService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { SubjectReq } from './dtos';
// import { SubjectResI } from '@/shares';

@ApiTags('Subjects')
@Controller('/subjects')
export class SubjectController {
  // dependency injection
  constructor(private subjectService: SubjectService) {}

  @Get()
  get() {
    return this.subjectService.get();
  }

  @Post()
  create(@Body() cls: SubjectReq) {
    return this.subjectService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: SubjectReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
