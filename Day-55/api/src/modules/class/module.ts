import { Module } from '@nestjs/common';
import { ClassController } from './controllers';
import { ClassService } from './services';
import { DatabaseModule } from '@/database/module';
import { classProviders } from '@/modules/class/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassController],
  providers: [...classProviders, ClassService],
})
export class ClassModule {}
