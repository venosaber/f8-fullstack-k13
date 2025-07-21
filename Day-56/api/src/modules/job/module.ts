import { Module } from '@nestjs/common';
import { JobController } from './controllers';
import { JobService } from './services';
import { DatabaseModule } from '@/database/module';
import { jobProviders } from '@/modules/job/providers';
import { JobServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [JobController],
  providers: [
    ...jobProviders,
    {
      provide: JobServiceToken,
      useClass: JobService,
    },
  ],
})
export class JobModule {}
