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
// import { ClassUserService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ClassUserReq } from './dtos';
import { ClassUserServiceToken } from '@/shares';
import { ClassUserServiceI } from '@/shares/type/services';
// import { ClassUserResI } from '@/shares';

@ApiTags('ClassUsers')
@Controller('/classUsers')
export class ClassUserController {
  // dependency injection
  constructor(
    @Inject(ClassUserServiceToken)
    private classUserService: ClassUserServiceI,
  ) {}

  @Get()
  getAll() {
    return this.classUserService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.classUserService.findOne(id);
  }

  @Post()
  create(@Body() classUser: ClassUserReq) {
    return this.classUserService.create(classUser);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() classUser: ClassUserReq,
  ) {
    return this.classUserService.updateOne(id, classUser);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.classUserService.softDelete(id);
  }
}
