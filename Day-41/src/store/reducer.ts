import { questions } from './data.ts';
import type {QuestionObject, State, Action} from '../utils';

const initQuestionObjects: QuestionObject[] = questions.map((question) => {
    return {
        ...question,
        isAnswered: false,
        selectedAnswer: null,   // selected but not submitted, can change
        submittedAnswer: null,
        optionBackgroundColors: question.options.map(() => '#333333')
    }
});

const initState: State = {
    countAnswered: 0,
    point: 0,
    curIndex: 0,
    questionObjects: initQuestionObjects
}

const setColors = (questionObj: QuestionObject) => {
    const {answer, selectedAnswer, submittedAnswer, options, isAnswered} = questionObj;
    const colors: string[] = options.map(() => '#333333');
    if (selectedAnswer !== null) {
        const selectedIndex: number = options.findIndex(option => option === selectedAnswer);

        if (!isAnswered) {
            colors[selectedIndex] = '#0000ff';
        } else {
            const correctIndex: number = options.findIndex(option => option === answer);
            colors[correctIndex] = '#008000';

            const submittedIndex: number = options.findIndex(option => option === submittedAnswer);
            if (submittedIndex !== correctIndex) {  // if submitted answer is wrong, color would be red to distinguish
                colors[submittedIndex] = '#ff0000';
            }
        }
    }
    return colors;
}

const actionHandlers = {
    'SELECT_OPTION': (state: State, action: Action) => {
        const newQuestionObjects: QuestionObject[] = [...state.questionObjects];
        const currentQuestionObj = {...newQuestionObjects[state.curIndex]};

        currentQuestionObj.selectedAnswer = action?.payload || null;
        currentQuestionObj.optionBackgroundColors = setColors(currentQuestionObj); // change color of selected answer to blue

        // copy from currentQuestionObj to store back to state
        newQuestionObjects[state.curIndex] = currentQuestionObj;
        return {
            ...state,
            questionObjects: newQuestionObjects
        }
    },

    'ANSWER': (state: State) => {
        const newQuestionObjects: QuestionObject[] = [...state.questionObjects];
        const currentQuestionObj = {...newQuestionObjects[state.curIndex]};

        const confirmedAnswer: string|null = currentQuestionObj.selectedAnswer;
        if (confirmedAnswer === null || currentQuestionObj.isAnswered) {
            return state;
        }

        let newPoint = state.point;
        if (confirmedAnswer === currentQuestionObj.answer) {
            newPoint++;
        }
        currentQuestionObj.submittedAnswer = confirmedAnswer;
        currentQuestionObj.isAnswered = true;
        currentQuestionObj.optionBackgroundColors = setColors(currentQuestionObj);

        // copy from currentQuestionObj to store back to state
        newQuestionObjects[state.curIndex] = currentQuestionObj;
        return {
            ...state,
            countAnswered: state.countAnswered + 1,
            point: newPoint,
            questionObjects: newQuestionObjects,
        }
    },

    'NEXT_QUESTION': (state: State) => {
        if (state.curIndex === questions.length - 1) {
            return state;
        }

        return {
            ...state,
            curIndex: state.curIndex + 1
        }
    },

    'PREV_QUESTION': (state: State) => {
        if (state.curIndex === 0) {
            return state;
        }

        return {
            ...state,
            curIndex: state.curIndex - 1
        }
    },

    'RESET': () => initState
}

const reducer = (state: State, action: Action) => {
    // @ts-expect-error the type is not perfectly matched
    const handler = actionHandlers[action.type];
    if (!handler) {
        throw new Error('Invalid action!');
    }
    return handler(state, action);
}

export {initState}
export default reducer;