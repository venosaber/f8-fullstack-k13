import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassModule } from './modules/classes/module';
import { StudentModule } from './modules/students/module';

@Module({
  imports: [ClassModule, StudentModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
