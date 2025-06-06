import {useEffect} from 'react'
import './App.css'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from "./store";
import {selectOption, showAnswer, nextQuestion, resetQuiz, countDown} from "./store/slicer/quiz.ts";
import type {State, Question} from './utils'

const optionLabels = ["A", "B", "C", "D"];

function App() {
    const curState: State = useSelector((state: RootState) => state.quiz)
    const dispatch: AppDispatch = useDispatch()

    const {currentQuestionIndex, questions, isAnswerShown, score, selectedOption, timeLeft} = curState;
    const curQuestion: Question = questions[currentQuestionIndex];
    const {id, question, options, answer} = curQuestion;

    const onAnswer = () => {
        if(selectedOption === null) return;
        dispatch(showAnswer())
    }

    const onMoveForward = () => {
        dispatch(nextQuestion())
    }

    const paint = (option: string) => {
        if (!isAnswerShown) {
            if (option === selectedOption) return "#0000ff";
            return "#000000";
        } else {
            if (option === selectedOption && option !== answer) {
                return "#ff0000"
            } else if (option === answer) {
                return "#008000"
            }
            return "#000000";
        }
    }

    useEffect(() => {
        if (timeLeft === 0) {
            // avoid calling showAnswer() twice
            if(!isAnswerShown) dispatch(showAnswer());
            // let user see the result before move to next question automatically
            setTimeout(() => {
                dispatch(nextQuestion());
            }, 1000);
            return;
        }
        // count down to 0
        const interval = setInterval(() => {
            dispatch(countDown())
        }, 1000)
        return () => clearInterval(interval);
    }, [isAnswerShown, timeLeft, dispatch])

    return (
        <>
            <form className={'container'}>
                <div className={'quiz-question'}>
                    <div className={'question-title-time'}>
                        <div>Câu {id}/{questions.length}</div>
                        <div>Còn: {timeLeft} giây</div>
                    </div>

                    <p>{question}</p>
                </div>
                <div className={'quiz-answers'}>
                    {
                        options.map((option: string, index: number) => {
                            return (
                                <div className={'quiz-answer'} key={index}>
                                    <input type={'radio'}
                                           name={'answer'}
                                           value={option}
                                           id={`option-${index}`}
                                           hidden={true}
                                           disabled={isAnswerShown}    // not allowing to change answer once submitted
                                           onChange={() => dispatch(selectOption(option))}
                                           checked={selectedOption === option}
                                    />
                                    <label htmlFor={`option-${index}`}
                                           className={`option-${index}`}
                                           style={{backgroundColor: paint(option)}}
                                    >
                                        {optionLabels[index]}. {option}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={'quiz-buttons'}>
                    <button type={'button'}
                            onClick={onAnswer}
                            disabled={selectedOption === null || isAnswerShown || timeLeft === 0}     // only allowing to submit answers once
                            className={'confirm-btn'}
                    >
                        Đây là câu trả lời cuối cùng của tôi
                    </button>

                    {
                        currentQuestionIndex < questions.length - 1 &&
                        <button type={'button'} className={'next-btn'}
                                   onClick={onMoveForward}
                                   disabled={!isAnswerShown}
                        >Tiếp theo</button>
                    }

                </div>

                <div className={'quiz-result'}>
                    {
                        currentQuestionIndex < questions.length - 1 && <p>Điểm: {score}</p>
                    }

                    {
                        currentQuestionIndex === questions.length - 1 && (isAnswerShown || timeLeft === 0) &&
                        <>
                            <p>Bài thi đã kết thúc. Kết quả của bạn là: {score}/{questions.length}</p>
                            <button type={'button'} className={'reset-btn'}
                                    onClick={() => dispatch(resetQuiz())}
                            >
                                Bắt đầu lại
                            </button>
                        </>

                    }
                </div>
            </form>
        </>
    )
}

export default App