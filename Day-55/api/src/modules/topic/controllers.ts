import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { TopicService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { TopicReq } from './dtos';
// import { TopicResI } from '@/shares';

@ApiTags('Topics')
@Controller('/topics')
export class TopicController {
  // dependency injection
  constructor(private topicService: TopicService) {}

  @Get()
  get() {
    return this.topicService.get();
  }

  @Post()
  create(@Body() cls: TopicReq) {
    return this.topicService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: TopicReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
