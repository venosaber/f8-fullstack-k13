interface QuestionBaseI {
  exam_id: number;
  index: number;
  type: string;
  correct_answer: string;
  topic_id: number;
}

export interface QuestionI extends QuestionBaseI {
  id: number;
}

export type QuestionReqI = QuestionBaseI;

export type QuestionResI = QuestionI;
