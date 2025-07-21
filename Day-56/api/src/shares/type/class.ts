interface ClassBaseI {
  name: string;
  code?: string;
  subject_id: number;
}

export interface ClassI extends ClassBaseI {
  id: number;
}

export type ClassReqI = ClassBaseI;

export type ClassResI = ClassI;
