import { Module } from '@nestjs/common';
import { ExamGroupController } from './controllers';
import { ExamGroupService } from './services';
import { DatabaseModule } from '@/database/module';
import { examGroupProviders } from '@/modules/ExamGroup/providers';
import { ExamGroupServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamGroupController],
  providers: [
    ...examGroupProviders,
    {
      provide: ExamGroupServiceToken,
      useClass: ExamGroupService,
    },
  ],
})
export class ExamGroupModule {}
