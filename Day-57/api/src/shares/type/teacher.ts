import { UserBaseI } from '@/shares';

type TeacherBaseI = UserBaseI;

export interface TeacherI extends TeacherBaseI {
  id: number;
}

export interface TeacherReqI extends TeacherBaseI {
  password: string;
}

export type TeacherResI = TeacherI;
