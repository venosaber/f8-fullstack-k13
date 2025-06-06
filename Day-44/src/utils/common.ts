export interface Question{
    id: number,
    question: string,
    options: string[],
    answer: string
}

export interface State{
    currentQuestionIndex: number,
    score: number,
    selectedOption: string | null,
    isAnswerShown: boolean,
    timeLeft: number,
    questions: Question[]
}

export interface Action{
    payload: string
}

