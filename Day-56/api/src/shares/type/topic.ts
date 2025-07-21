interface TopicBaseI {
  name: string;
  subject_id: number;
  code: number;
}

export interface TopicI extends TopicBaseI {
  id: number;
}

export type TopicReqI = TopicBaseI;

export type TopicResI = TopicI;
