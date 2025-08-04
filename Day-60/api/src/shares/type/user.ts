export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface UserBase {
  name: string;
  email: string;

  status: string;
  avatar?: number | null;
  parent_name?: string | null;
  parent_phone?: string | null;
}

export interface UserI extends UserBase {
  id: number;
  role: Role;
}

export interface UserReqI extends UserBase {
  password: string;
}

export interface UserResI extends UserI {
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
