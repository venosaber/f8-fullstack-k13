import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { ExamService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ExamReq } from './dtos';
// import { ExamResI } from '@/shares';

@ApiTags('Exams')
@Controller('/exams')
export class ExamController {
  // dependency injection
  constructor(private examService: ExamService) {}

  @Get()
  get() {
    return this.examService.get();
  }

  @Post()
  create(@Body() cls: ExamReq) {
    return this.examService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: ExamReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
