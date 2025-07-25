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
import { TeacherService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { TeacherReq } from './dtos';
import { TeacherServiceToken } from '@/shares';
// import { TeacherResI } from '@/shares';

@ApiTags('Teachers')
@Controller('/teachers')
export class TeacherController {
  // dependency injection
  constructor(
    @Inject(TeacherServiceToken)
    private teacherService: TeacherService,
  ) {}

  @Get()
  getAll() {
    return this.teacherService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOne(id);
  }

  @Post()
  create(@Body() teacher: TeacherReq) {
    return this.teacherService.create(teacher);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() teacher: TeacherReq) {
    return this.teacherService.updateOne(id, teacher);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.softDelete(id);
  }
}
