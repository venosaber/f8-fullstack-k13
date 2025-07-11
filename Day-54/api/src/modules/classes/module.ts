import { Module } from '@nestjs/common';
import { ClassService } from './services';
import { ClassController } from './controllers';

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
