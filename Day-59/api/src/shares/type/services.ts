import {
  UserReqI,
  LoginReqI,
  LoginResI,
  StudentReqI,
  RegisterReqI,
  UserResI,
  StudentI,
  TeacherI,
  TeacherReqI,
} from '@/shares';

export interface BaseServiceI<RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  findOne: (id: number) => Promise<ResponseI>;
  create: (data: RequestI) => Promise<ResponseI>;
  updateOne: (id: number, data: RequestI) => Promise<ResponseI>;
  softDelete: (id: number) => Promise<{ msg: string }>;
}

export interface UserServiceI extends BaseServiceI<UserReqI, UserResI> {
  findUserByEmailWithPassword: (email: string) => Promise<UserResI | null>;
}

export type StudentServiceI = BaseServiceI<StudentReqI, StudentI>;
export type TeacherServiceI = BaseServiceI<TeacherReqI, TeacherI>;

export interface AuthServiceI {
  login: (data: LoginReqI) => Promise<LoginResI>;
  register: (data: RegisterReqI) => Promise<{ msg: string }>;
}
