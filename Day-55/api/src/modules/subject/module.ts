import { Module } from '@nestjs/common';
import { SubjectController } from './controllers';
import { SubjectService } from './services';
import { DatabaseModule } from '@/database/module';
import { subjectProviders } from '@/modules/subject/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectController],
  providers: [...subjectProviders, SubjectService],
})
export class SubjectModule {}
