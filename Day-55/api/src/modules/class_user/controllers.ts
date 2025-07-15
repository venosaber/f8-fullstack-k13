import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { ClassUserService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ClassUserReq } from './dtos';
// import { ClassUserResI } from '@/shares';

@ApiTags('ClassUser')
@Controller('/class-user')
export class ClassUserController {
  // dependency injection
  constructor(private classUserService: ClassUserService) {}

  @Get()
  get() {
    return this.classUserService.get();
  }

  @Post()
  create(@Body() cls: ClassUserReq) {
    return this.classUserService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: ClassUserReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
