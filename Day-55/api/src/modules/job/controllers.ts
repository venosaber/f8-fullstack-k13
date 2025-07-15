import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { JobService } from './services';
import { ApiTags } from '@nestjs/swagger';
import { JobReq } from './dtos';
// import { JobResI } from '@/shares';

@ApiTags('Jobs')
@Controller('/jobs')
export class JobController {
  // dependency injection
  constructor(private jobService: JobService) {}

  @Get()
  get() {
    return this.jobService.get();
  }

  @Post()
  create(@Body() cls: JobReq) {
    return this.jobService.create(cls);
  }
  //
  // @Put('/:id')
  // update(@Param('id') id: number, @Body() cls: JobReq) {
  //     return this.classService.update(id, cls)
  // }
  //
  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //     return this.classService.delete(id)
  // }
}
