import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@/shares';
import { ClassEntity } from '@/modules/Class/entities';
import { SubjectEntity } from '@/modules/Subject/entities';
import { ClassUserEntity } from '@/modules/ClassUser/entities';
import { ExamGroupEntity } from '@/modules/ExamGroup/entities';
import { ExamEntity } from '@/modules/Exam/entities';
import { QuestionEntity } from '@/modules/Question/entities';
import { AnswerEntity } from '@/modules/Answer/entities';
import { ExamResultEntity } from '@/modules/ExamResult/entities';
import { TopicEntity } from '@/modules/Topic/entities';
import { FileEntity } from '@/modules/File/entities';
import { JobEntity } from '@/modules/Job/entities';
import { UserEntity } from '@/modules/User/entities';

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
