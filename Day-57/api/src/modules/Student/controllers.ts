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
import { StudentService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { StudentReq } from './dtos';
import { StudentServiceToken } from '@/shares';
// import { StudentResI } from '@/shares';

@ApiTags('Students')
@Controller('/students')
export class StudentController {
  // dependency injection
  constructor(
    @Inject(StudentServiceToken)
    private studentService: StudentService,
  ) {}

  @Get()
  getAll() {
    return this.studentService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() student: StudentReq) {
    return this.studentService.create(student);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() student: StudentReq) {
    return this.studentService.updateOne(id, student);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.softDelete(id);
  }
}
