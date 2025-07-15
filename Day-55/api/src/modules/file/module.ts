import { Module } from '@nestjs/common';
import { FileController } from './controllers';
import { FileService } from './services';
import { DatabaseModule } from '@/database/module';
import { fileProviders } from '@/modules/file/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FileController],
  providers: [...fileProviders, FileService],
})
export class FileModule {}
