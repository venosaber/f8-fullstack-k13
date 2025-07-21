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
// import { ClassService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ClassReq } from './dtos';
import { ClassServiceToken } from '@/shares';
import { ClassServiceI } from '@/shares/type/services';
// import { ClassResI } from '@/shares';

@ApiTags('Classes')
@Controller('/classes')
export class ClassController {
  // dependency injection
  constructor(
    @Inject(ClassServiceToken)
    private classService: ClassServiceI,
  ) {}

  @Get()
  getAll() {
    return this.classService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.classService.findOne(id);
  }

  @Post()
  create(@Body() cls: ClassReq) {
    return this.classService.create(cls);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() cls: ClassReq) {
    return this.classService.updateOne(id, cls);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.classService.softDelete(id);
  }
}
