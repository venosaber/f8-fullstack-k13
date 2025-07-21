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
// import { UserService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { UserReq } from './dtos';
import { UserServiceToken } from '@/shares';
import { UserServiceI } from '@/shares/type/services';
// import { UserResI } from '@/shares';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  // dependency injection
  constructor(
    @Inject(UserServiceToken)
    private userService: UserServiceI,
  ) {}

  @Get()
  getAll() {
    return this.userService.find();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: UserReq) {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UserReq) {
    return this.userService.updateOne(id, user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDelete(id);
  }
}
