import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { QuestionService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { QuestionReq } from './dtos';
// import { QuestionResI } from '@/shares';

@ApiTags('Questions')
@Controller('/questions')
export class QuestionController {
  // dependency injection
  constructor(private questionService: QuestionService) {}

  @Get()
  get() {
    return this.questionService.get();
  }

  @Post()
  create(@Body() cls: QuestionReq) {
    return this.questionService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: QuestionReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
