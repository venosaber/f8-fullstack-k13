import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@/shares';
import { ClassEntity } from '@/modules/class/entities';
import { SubjectEntity } from '@/modules/subject/entities';
import { ClassUserEntity } from '@/modules/class_user/entities';
import { ExamGroupEntity } from '@/modules/examGroup/entities';
import { ExamEntity } from '@/modules/exam/entities';
import { QuestionEntity } from '@/modules/question/entities';
import { AnswerEntity } from '@/modules/answer/entities';
import { ExamResultEntity } from '@/modules/examResult/entities';
import { TopicEntity } from '@/modules/topic/entities';
import { FileEntity } from '@/modules/file/entities';
import { JobEntity } from '@/modules/job/entities';
import { UserEntity } from '@/modules/user/entities';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [
          ClassEntity,
          SubjectEntity,
          ClassUserEntity,
          ExamGroupEntity,
          ExamEntity,
          QuestionEntity,
          AnswerEntity,
          ExamResultEntity,
          TopicEntity,
          FileEntity,
          JobEntity,
          UserEntity,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
