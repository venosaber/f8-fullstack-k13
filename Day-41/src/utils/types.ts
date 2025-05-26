export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

export interface QuestionObject extends Question {
    isAnswered: boolean;
    selectedAnswer: string | null;
    submittedAnswer: string | null;
    optionBackgroundColors: string[];
}

export interface State {
    countAnswered: number;
    point: number;
    curIndex: number;
    questionObjects: QuestionObject[];
}

export interface Action {
    type: string;
    payload?: string | null;
}