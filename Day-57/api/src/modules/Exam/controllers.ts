import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
// import { ExamService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ExamReq } from './dtos';
import { ExamServiceToken } from '@/shares';
import { ExamServiceI } from '@/shares/type/services';
// import { ExamResI } from '@/shares';

@ApiTags('Exams')
@Controller('/exams')
export class ExamController {
  // dependency injection
  constructor(
    @Inject(ExamServiceToken)
    private examService: ExamServiceI,
  ) {}

  @Get()
  getAll() {
    return this.examService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.examService.findOne(id);
  }

  @Post()
  create(@Body() exam: ExamReq) {
    return this.examService.create(exam);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() exam: ExamReq) {
    return this.examService.updateOne(id, exam);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.examService.softDelete(id);
  }
}
