interface ExamBaseI {
  name: string;
  exam_group_id: number;
  class_id: number;
  code: string;
  number_of_question: number;
  total_time: number;
  correct_answer: object;
  description: string;
  device: string;
}

export interface ExamI extends ExamBaseI {
  id: number;
}

export type ExamReqI = ExamBaseI;

export type ExamResI = ExamI;
