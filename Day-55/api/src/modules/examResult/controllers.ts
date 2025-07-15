import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { ExamResultService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ExamResultReq } from './dtos';
// import { ExamResultResI } from '@/shares';

@ApiTags('ExamResults')
@Controller('/exam-results')
export class ExamResultController {
  // dependency injection
  constructor(private examResultService: ExamResultService) {}

  @Get()
  get() {
    return this.examResultService.get();
  }

  @Post()
  create(@Body() cls: ExamResultReq) {
    return this.examResultService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: ExamResultReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
