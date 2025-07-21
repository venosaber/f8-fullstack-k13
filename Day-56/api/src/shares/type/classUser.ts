interface ClassUserBaseI {
  classId: number;
  userId: number;
}

export interface ClassUserI extends ClassUserBaseI {
  id: number;
}

export type ClassUserReqI = ClassUserBaseI;

export type ClassUserResI = ClassUserI;
