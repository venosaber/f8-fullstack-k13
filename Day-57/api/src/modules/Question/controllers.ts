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
// import { QuestionService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { QuestionReq } from './dtos';
import { QuestionServiceToken } from '@/shares';
import { QuestionServiceI } from '@/shares/type/services';
// import { QuestionResI } from '@/shares';

@ApiTags('Questions')
@Controller('/questions')
export class QuestionController {
  // dependency injection
  constructor(
    @Inject(QuestionServiceToken)
    private questionService: QuestionServiceI,
  ) {}

  @Get()
  getAll() {
    return this.questionService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findOne(id);
  }

  @Post()
  create(@Body() question: QuestionReq) {
    return this.questionService.create(question);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() question: QuestionReq) {
    return this.questionService.updateOne(id, question);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.softDelete(id);
  }
}
