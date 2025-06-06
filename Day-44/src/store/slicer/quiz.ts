import {createSlice} from '@reduxjs/toolkit';
import {questions} from '../data.ts'
import type {State, Action} from '../../utils'

const initialState: State = {
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: null,
    isAnswerShown: false,
    timeLeft: 10,
    questions
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        selectOption: (state: State, action: Action) => {
            state.selectedOption = action.payload
        },
        showAnswer: (state: State)=>{
            state.isAnswerShown = true;

            const {currentQuestionIndex, score, selectedOption, questions} = state;
            const currentQuestion = questions[currentQuestionIndex];
            const correctAnswer = currentQuestion.answer;
            if(selectedOption === correctAnswer){
                state.score = score + 1;
            }
        },
        nextQuestion: (state: State)=>{
            if(state.currentQuestionIndex < questions.length-1){
                state.currentQuestionIndex += 1;
                state.selectedOption = null;
                state.isAnswerShown = false;

                state.timeLeft = 10;
            }
        },
        resetQuiz: (state: State)=>{
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.selectedOption = null;
            state.isAnswerShown = false;

            state.timeLeft = 10;
        },
        countDown: (state: State)=>{
            state.timeLeft -= 1;
        }

}
})

export const {selectOption, showAnswer, nextQuestion, resetQuiz, countDown} = quizSlice.actions;
export default quizSlice.reducer;