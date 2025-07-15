interface JobBaseI {
  name: string;
}

export interface JobI extends JobBaseI {
  id: number;
}

export type JobReqI = JobBaseI;

export type JobResI = JobI;
