import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import type { StudentServiceI } from '@/shares';
import { StudentReq } from '@/modules/student/dtos';
import { StudentServiceToken, Role } from '@/shares';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/guard';
import { RolesGuard } from '@/modules/auth/roles/guard';
import { Roles } from '@/modules/auth/roles/decorator';

@ApiTags('Students')
@Controller('/students')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(Role.STUDENT, Role.ADMIN)
export class StudentController {
  constructor(
    @Inject(StudentServiceToken)
    private readonly studentService: StudentServiceI,
  ) {}

  @Get()
  findAll() {
    return this.studentService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() data: StudentReq) {
    return this.studentService.updateOne(id, data);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.softDelete(id);
  }
}
