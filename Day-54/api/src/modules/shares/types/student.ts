export interface AvataI {
  id: number | null;
  url: string;
  payload: string;
}

interface StudentBaseI {
  name: string;
  email: string;
  school: string;
  parent_name: string;
  parent_phone: string;
  avata: AvataI;
}

export type StudentReqI = StudentBaseI;

export interface StudentResI extends StudentBaseI {
  id: number;
}
