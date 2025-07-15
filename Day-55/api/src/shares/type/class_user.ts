interface ClassUserBaseI {
  class_id: number;
  user_id: number;
}

export interface ClassUserI extends ClassUserBaseI {
  id: number;
}

export type ClassUserReqI = ClassUserBaseI;

export type ClassUserResI = ClassUserI;
