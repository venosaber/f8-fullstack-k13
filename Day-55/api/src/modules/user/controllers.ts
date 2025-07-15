import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { UserService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { UserReq } from './dtos';
// import { UserResI } from '@/shares';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  // dependency injection
  constructor(private userService: UserService) {}

  @Get()
  get() {
    return this.userService.get();
  }

  @Post()
  create(@Body() cls: UserReq) {
    return this.userService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: UserReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
