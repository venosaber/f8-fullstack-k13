import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { ExamGroupService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ExamGroupReq } from './dtos';
// import { ExamGroupResI } from '@/shares';

@ApiTags('ExamGroups')
@Controller('/exam-groups')
export class ExamGroupController {
  // dependency injection
  constructor(private examGroupService: ExamGroupService) {}

  @Get()
  get() {
    return this.examGroupService.get();
  }

  @Post()
  create(@Body() cls: ExamGroupReq) {
    return this.examGroupService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: ExamGroupReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
