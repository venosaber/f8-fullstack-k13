import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { type TeacherServiceI, TeacherServiceToken } from '@/shares';
import { TeacherReq } from '@/modules/teacher/dtos';
import { AuthGuard } from '@/modules/auth/guard';
import { RolesGuard } from '@/modules/auth/roles/guard';
import { Roles } from '@/modules/auth/roles/decorator';
import { Role } from '@/shares';

@ApiTags('Teachers')
@Controller('/teachers')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(Role.TEACHER, Role.ADMIN)
export class TeacherController {
  constructor(
    @Inject(TeacherServiceToken)
    private readonly teacherService: TeacherServiceI,
  ) {}

  @Get()
  findAll() {
    return this.teacherService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() data: TeacherReq) {
    return this.teacherService.updateOne(id, data);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.softDelete(id);
  }
}
