import { Module } from '@nestjs/common';
import { SubjectController } from './controllers';
import { SubjectService } from './services';
import { DatabaseModule } from '@/database/module';
import { subjectProviders } from '@/modules/subject/providers';
import { SubjectServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectController],
  providers: [
    ...subjectProviders,
    {
      provide: SubjectServiceToken,
      useClass: SubjectService,
    },
  ],
})
export class SubjectModule {}
