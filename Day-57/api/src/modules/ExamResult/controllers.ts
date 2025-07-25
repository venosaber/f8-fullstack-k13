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
// import { ExamResultService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ExamResultReq } from './dtos';
import { ExamResultServiceToken } from '@/shares';
import { ExamResultServiceI } from '@/shares/type/services';
// import { ExamResultResI } from '@/shares';

@ApiTags('ExamResults')
@Controller('/examResults')
export class ExamResultController {
  // dependency injection
  constructor(
    @Inject(ExamResultServiceToken)
    private examResultService: ExamResultServiceI,
  ) {}

  @Get()
  getAll() {
    return this.examResultService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.examResultService.findOne(id);
  }

  @Post()
  create(@Body() examResult: ExamResultReq) {
    return this.examResultService.create(examResult);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() examResult: ExamResultReq,
  ) {
    return this.examResultService.updateOne(id, examResult);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.examResultService.softDelete(id);
  }
}
