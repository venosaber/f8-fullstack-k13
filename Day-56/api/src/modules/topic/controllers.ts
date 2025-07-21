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
// import { TopicService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { TopicReq } from './dtos';
import { TopicServiceToken } from '@/shares';
import { TopicServiceI } from '@/shares/type/services';
// import { TopicResI } from '@/shares';

@ApiTags('Topics')
@Controller('/topics')
export class TopicController {
  // dependency injection
  constructor(
    @Inject(TopicServiceToken)
    private topicService: TopicServiceI,
  ) {}

  @Get()
  getAll() {
    return this.topicService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.topicService.findOne(id);
  }

  @Post()
  create(@Body() topic: TopicReq) {
    return this.topicService.create(topic);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() topic: TopicReq) {
    return this.topicService.updateOne(id, topic);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.topicService.softDelete(id);
  }
}
