interface ExamResultBaseI {
  user_id: number;
  exam_id: number;
  status: string;
  answers: object;
  number_of_correct_answer: number;
  score: number;
}

export interface ExamResultI extends ExamResultBaseI {
  id: number;
}

export type ExamResultReqI = ExamResultBaseI;

export type ExamResultResI = ExamResultI;
