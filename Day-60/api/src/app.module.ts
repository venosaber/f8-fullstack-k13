import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/module';
import { StudentModule } from '@/modules/student/module';
import { TeacherModule } from '@/modules/teacher/module';
import { AuthModule } from '@/modules/auth/module';

@Module({
  imports: [DatabaseModule, TeacherModule, StudentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
