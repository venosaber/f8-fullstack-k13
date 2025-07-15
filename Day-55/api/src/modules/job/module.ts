import { Module } from '@nestjs/common';
import { JobController } from './controllers';
import { JobService } from './services';
import { DatabaseModule } from '@/database/module';
import { jobProviders } from '@/modules/job/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [JobController],
  providers: [...jobProviders, JobService],
})
export class JobModule {}
