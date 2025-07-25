import { Module } from '@nestjs/common';
import { ClassController } from './controllers';
import { ClassService } from './services';
import { DatabaseModule } from '@/database/module';
import { classProviders } from '@/modules/Class/providers';
import { ClassServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassController],
  providers: [
    ...classProviders,
    {
      provide: ClassServiceToken,
      useClass: ClassService,
    },
  ],
})
export class ClassModule {}
