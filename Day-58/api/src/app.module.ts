import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/module';
import { ImageModule } from '@/modules/image/module';

@Module({
  imports: [DatabaseModule, ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
