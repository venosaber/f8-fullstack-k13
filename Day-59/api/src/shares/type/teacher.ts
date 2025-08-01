import { UserBase } from '@/shares/type/user';

export type TeacherBase = UserBase;

export interface TeacherI extends TeacherBase {
  id: number;
}

export interface TeacherReqI extends TeacherBase {
  password: string;
}

export type TeacherResI = TeacherI;
