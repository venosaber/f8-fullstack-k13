import { Module } from '@nestjs/common';
import { ExamGroupController } from './controllers';
import { ExamGroupService } from './services';
import { DatabaseModule } from '@/database/module';
import { examGroupProviders } from '@/modules/examGroup/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamGroupController],
  providers: [...examGroupProviders, ExamGroupService],
})
export class ExamGroupModule {}
