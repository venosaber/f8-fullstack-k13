import {useContext, useRef} from 'react'
import type {RefObject} from 'react'
import './App.css'
import {StoreContext} from './store'

const optionLabels = ["A", "B", "C", "D"];

function App() {
    // @ts-expect-error the type is not perfectly matched
    const [state, dispatch] = useContext(StoreContext);

    const formRef: RefObject<HTMLFormElement|null> = useRef<HTMLFormElement>(null);

    const {countAnswered, curIndex, point} = state;
    const curQuestionObj = state.questionObjects[curIndex];
    const {id, question, options, isAnswered, optionBackgroundColors} = curQuestionObj;

    const onAnswer = () => {
        const form: HTMLFormElement = formRef.current!;
        const selectedAnswer = Object(form.elements)['answer']!.value;
        dispatch({type: 'ANSWER', payload: selectedAnswer})
    }

    const onMoveBackward = () => {
        dispatch({type: 'PREV_QUESTION'})
    }

    const onMoveForward = () => {
        dispatch({type: 'NEXT_QUESTION'})
    }

    return (
        <>
            <form className={'container'} ref={formRef}>
                <div className={'quiz-question'}>
                    <div>Câu {id}/{state.questionObjects.length}</div>
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
                                           disabled={isAnswered}    // not allow to change answer once submitted
                                           onChange={() => dispatch({type: 'SELECT_OPTION', payload: option})}
                                           checked={curQuestionObj.selectedAnswer === option}
                                    />
                                    <label htmlFor={`option-${index}`}
                                           className={`option-${index}`}
                                           style={{backgroundColor: optionBackgroundColors[index]}}
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
                            disabled={isAnswered}     // only allow to submit answers once
                            className={'confirm-btn'}
                    >
                        Đây là câu trả lời cuối cùng của tôi
                    </button>

                    {
                        curIndex > 0 && <button type={'button'} onClick={onMoveBackward}
                                                className={'prev-btn'}>Trở lại</button>
                    }

                    {
                        curIndex < state.questionObjects.length - 1 && <button type={'button'} onClick={onMoveForward}
                                                                               className={'next-btn'}>Tiếp theo</button>
                    }

                </div>

                <div className={'quiz-result'}>
                    {
                        countAnswered < state.questionObjects.length && <p>Điểm: {point}</p>
                    }

                    {
                        countAnswered === state.questionObjects.length &&
                        <>
                            <p>Bài thi đã kết thúc. Kết quả của bạn là: {point}/{state.questionObjects.length}</p>
                            <button type={'button'} className={'reset-btn'}
                                    onClick={() => dispatch({type: 'RESET'})}
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