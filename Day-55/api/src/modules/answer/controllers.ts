import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { AnswerService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { AnswerReq } from './dtos';
// import { AnswerResI } from '@/shares';

@ApiTags('Answers')
@Controller('/answers')
export class AnswerController {
  // dependency injection
  constructor(private answerService: AnswerService) {}

  @Get()
  get() {
    return this.answerService.get();
  }

  @Post()
  create(@Body() cls: AnswerReq) {
    return this.answerService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: AnswerReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
