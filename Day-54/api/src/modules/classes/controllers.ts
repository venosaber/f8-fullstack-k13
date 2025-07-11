import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { ClassReq, ClassRes } from './dtos';

@ApiTags('Class')
@Controller('/classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  get(): ClassRes[] {
    return this.classService.get();
  }

  @Post()
  create(@Body() newClass: ClassReq): ClassRes {
    return this.classService.create(newClass);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() curClass: ClassReq): ClassRes {
    return this.classService.update(id, curClass);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.classService.delete(id);
  }
}
