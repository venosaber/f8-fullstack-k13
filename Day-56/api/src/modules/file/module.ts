import { Module } from '@nestjs/common';
import { FileController } from './controllers';
import { FileService } from './services';
import { DatabaseModule } from '@/database/module';
import { fileProviders } from '@/modules/file/providers';
import { FileServiceToken } from '@/shares';

@Module({
  imports: [DatabaseModule],
  controllers: [FileController],
  providers: [
    ...fileProviders,
    {
      provide: FileServiceToken,
      useClass: FileService,
    },
  ],
})
export class FileModule {}
