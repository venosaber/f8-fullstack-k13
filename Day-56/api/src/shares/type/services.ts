import {
  AnswerReqI,
  ClassReqI,
  ClassUserReqI,
  ExamReqI,
  ExamGroupReqI,
  ExamResultReqI,
  FileReqI,
  JobReqI,
  QuestionReqI,
  SubjectReqI,
  TopicReqI,
  UserReqI,
} from '@/shares';

export interface BaseServiceI<RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  findOne: (id: number) => Promise<ResponseI>;
  create: (data: RequestI) => Promise<ResponseI>;
  updateOne: (id: number, data: RequestI) => Promise<ResponseI>;
  softDelete: (id: number) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AnswerServiceI extends BaseServiceI<AnswerReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClassServiceI extends BaseServiceI<ClassReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClassUserServiceI extends BaseServiceI<ClassUserReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExamServiceI extends BaseServiceI<ExamReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExamGroupServiceI extends BaseServiceI<ExamGroupReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExamResultServiceI extends BaseServiceI<ExamResultReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FileServiceI extends BaseServiceI<FileReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JobServiceI extends BaseServiceI<JobReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface QuestionServiceI extends BaseServiceI<QuestionReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SubjectServiceI extends BaseServiceI<SubjectReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TopicServiceI extends BaseServiceI<TopicReqI, any> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserServiceI extends BaseServiceI<UserReqI, any> {}
