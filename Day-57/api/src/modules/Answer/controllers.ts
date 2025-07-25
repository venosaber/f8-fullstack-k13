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
// import { AnswerService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { AnswerReq } from './dtos';
import { AnswerServiceToken } from '@/shares';
import { AnswerServiceI } from '@/shares/type/services';
// import { AnswerResI } from '@/shares';

@ApiTags('Answers')
@Controller('/answers')
export class AnswerController {
  // dependency injection
  constructor(
    @Inject(AnswerServiceToken)
    private answerService: AnswerServiceI,
  ) {}

  @Get()
  getAll() {
    return this.answerService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.findOne(id);
  }

  @Post()
  create(@Body() answer: AnswerReq) {
    return this.answerService.create(answer);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() answer: AnswerReq) {
    return this.answerService.updateOne(id, answer);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.softDelete(id);
  }
}
