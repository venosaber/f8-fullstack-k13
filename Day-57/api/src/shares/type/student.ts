import { UserBaseI } from '@/shares';

type StudentBaseI = UserBaseI;

export interface StudentI extends StudentBaseI {
  id: number;
}

export interface StudentReqI extends StudentBaseI {
  password: string;
}

export type StudentResI = StudentI;
