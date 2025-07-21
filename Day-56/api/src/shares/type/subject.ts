interface SubjectBaseI {
  name: string;
  code: string;
}

export interface SubjectI extends SubjectBaseI {
  id: number;
}

export type SubjectReqI = SubjectBaseI;

export type SubjectResI = SubjectI;
