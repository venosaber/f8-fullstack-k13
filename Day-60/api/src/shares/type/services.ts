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
import { ForgotPasswordReq, ResetPasswordReq } from '@/modules/auth/dtos';

export interface BaseServiceI<RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  findOne: (id: number) => Promise<ResponseI>;
  findOneBy: (params?: any) => Promise<ResponseI | null>;
  create: (data: RequestI) => Promise<ResponseI>;
  updateOne: (id: number, data: Partial<RequestI>) => Promise<ResponseI>;
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
  forgotPassword: (data: ForgotPasswordReq) => Promise<{ msg: string }>;
  resetPassword: (data: ResetPasswordReq) => Promise<{ msg: string }>;
}
