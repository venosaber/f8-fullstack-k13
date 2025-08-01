export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface UserBase {
  name: string;
  email: string;
}

export interface UserI extends UserBase {
  id: number;
}

export interface UserReqI extends UserBase {
  password: string;
}

export interface UserResI extends UserI {
  role: Role;
  password: string;
}

export interface LoginReqI {
  email: string;
  password: string;
}

export interface LoginResI {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterReqI extends UserReqI {
  role: Role;
}
