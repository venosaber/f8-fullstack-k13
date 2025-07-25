export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface UserBaseI {
  name: string;
  email: string;
  // role: Role;
  status: string;
  avatar: number | null;
  parent_name: string;
  parent_phone: string;
}

export interface UserI extends UserBaseI {
  id: number;
}

export interface UserReqI extends UserBaseI {
  password: string;
}

export type UserResI = UserI;
