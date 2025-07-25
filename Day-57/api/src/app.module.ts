import { Module } from '@nestjs/common';

import { AnswerModule } from '@/modules/Answer/module';
import { ClassModule } from '@/modules/Class/module';
import { ExamModule } from '@/modules/Exam/module';
import { ExamGroupModule } from '@/modules/ExamGroup/module';
import { ExamResultModule } from '@/modules/ExamResult/module';
import { FileModule } from '@/modules/File/module';
import { InvitationModule } from '@/modules/Invitation/module';
import { JobModule } from '@/modules/Job/module';
import { QuestionModule } from '@/modules/Question/module';
import { StudentModule } from './modules/Student/module';
import { SubjectModule } from '@/modules/Subject/module';
import { TeacherModule } from '@/modules/Teacher/module';
import { TopicModule } from '@/modules/Topic/module';
import { DatabaseModule } from '@/database/module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    AnswerModule,
    ClassModule,
    ExamModule,
    ExamGroupModule,
    ExamResultModule,
    FileModule,
    InvitationModule,
    JobModule,
    QuestionModule,
    StudentModule,
    SubjectModule,
    TeacherModule,
    TopicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
