interface ClassBaseI {
  name: string;
  code: string;
  users: number[];
}

export type ClassReqI = ClassBaseI;

export interface ClassResI extends ClassBaseI {
  id: number;
}
