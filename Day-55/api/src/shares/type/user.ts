interface UserBaseI {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  avatar: number | null;
  parent_name: string;
  parent_phone: string;
}

export interface UserI extends UserBaseI {
  id: number;
}

export type UserReqI = UserBaseI;

export type UserResI = UserI;
