import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { StudentReq, StudentRes } from './dtos';

@ApiTags('Student')
@Controller('/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  get(): StudentRes[] {
    return this.studentService.get();
  }

  @Post()
  create(@Body() newStudent: StudentReq): StudentRes {
    return this.studentService.create(newStudent);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() curStudent: StudentReq): StudentRes {
    return this.studentService.update(id, curStudent);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
