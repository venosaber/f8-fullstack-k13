import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ImageEntity } from '@/modules/image/entity';
import { DatabaseModule } from '@/database/module';
import { CloudinaryModule } from '@/modules/cloudinary/module';
import {
  DATA_SOURCE,
  ImageEntityRepository,
  ImageServiceToken,
} from '@/shares';
import { ImageService } from '@/modules/image/service';
import { ImageController } from '@/modules/image/controller';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [ImageController],
  providers: [
    {
      provide: ImageEntityRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ImageEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: ImageServiceToken,
      useClass: ImageService,
    },
  ],
})
export class ImageModule {}
