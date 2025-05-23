import {useEffect, useReducer, useRef} from 'react'
import type {RefObject, KeyboardEvent} from 'react'

import './App.css'

interface State {
    job: string,
    jobs: string[],
    editingIndex: number | null,
    currentEditText: string
}

interface Action {
    type: string,
    payload?: string | number
}

const initState: State = {
    job: '',            // For new job input
    jobs: [],           // Array of todo strings
    editingIndex: null, // Index of the job being edited inline, or null
    currentEditText: '' // Text for the inline edit input
}

// Action Types
const SET_JOB = 'SET_JOB' // For the main input (new job)
const ADD_JOB = 'ADD_JOB'
const DELETE_JOB = 'DELETE_JOB'

const START_INLINE_EDIT = 'START_INLINE_EDIT'
const SET_CURRENT_EDIT_TEXT = 'SET_CURRENT_EDIT_TEXT' // For inline input
const SAVE_INLINE_EDIT = 'SAVE_INLINE_EDIT'
const CANCEL_INLINE_EDIT = 'CANCEL_INLINE_EDIT'

// Main Input Actions
const setJob = (payload: string) => {
    return {type: SET_JOB, payload}
}
const addJob = (payload: string) => {
    return {type: ADD_JOB, payload}
}
const deleteJob = (payload: number) => {
    return {type: DELETE_JOB, payload}
}

// Inline Edit Actions
const startInlineEdit = (payload: number) => { // payload is the index
    return {type: START_INLINE_EDIT, payload}
}
const setCurrentEditText = (payload: string) => { // payload is the text
    return {type: SET_CURRENT_EDIT_TEXT, payload}
}
const saveInlineEdit = () => { // No payload, uses state
    return {type: SAVE_INLINE_EDIT}
}
const cancelInlineEdit = () => {
    return {type: CANCEL_INLINE_EDIT}
}

// Map action types to action handlers
const actionHandlers = {
    SET_JOB: (state: State, action: Action) => {
        return {...state, job: action.payload}
    },

    ADD_JOB: (state: State, action: Action) => {
        if (!String(action.payload).trim()) return state; // avoid adding empty jobs
        return {
            ...state,
            job: '', // Clear main input
            jobs: [...state.jobs, action.payload]
        }
    },

    DELETE_JOB: (state: State, action: Action) => {
        const newJobs = [...state.jobs];
        newJobs.splice(Number(action.payload), 1); // payload is the index of the job to delete
        return {
            ...state,
            jobs: newJobs
        }
    },

    /* inline edit action handlers */
    START_INLINE_EDIT: (state: State, action: Action) => {
        return {
            ...state,
            editingIndex: action.payload,     // payload is the index of the job to edit
            currentEditText: state.jobs[Number(action.payload)] // Populate inline input
        }
    },

    SET_CURRENT_EDIT_TEXT: (state: State, action: Action) => {
        return {
            ...state,
            currentEditText: action.payload             // payload is the text of the job to edit
        }
    },

    SAVE_INLINE_EDIT: (state: State) => {
        if (!state.currentEditText.trim()) return state; // avoid saving empty jobs
        const newJobs = [...state.jobs];
        newJobs[Number(state.editingIndex)] = state.currentEditText.trim();
        return {
            ...state,
            jobs: newJobs,
            editingIndex: null,
            currentEditText: ''
        }
    },

    CANCEL_INLINE_EDIT: (state: State) => {
        return {
            ...state,
            editingIndex: null,
            currentEditText: ''
        }
    }

}

// Reducer
const reducer = (state: State, action: Action) => {
    // @ts-expect-error the type is not correct, but it works fine
    const handler = actionHandlers[action.type];
    if (!handler) {
        throw new Error('invalid action!');
    }
    return handler(state, action);
}

function App() {
    const [state, dispatch] = useReducer(reducer, initState);
    const {job, jobs, editingIndex, currentEditText} = state;

    const mainInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
    const inlineEditInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);


    // Focus the inline input when it appears
    useEffect(() => {
        if (editingIndex !== null && inlineEditInputRef.current) {
            inlineEditInputRef.current.focus();
            inlineEditInputRef.current.select(); // select all text
        }
    }, [editingIndex]); // depends on editingIndex


    const handleAddSubmit = () => {
        if (!job.trim()) {
            mainInputRef.current?.focus(); // avoid adding empty jobs
            return;
        }
        dispatch(addJob(job));
        mainInputRef.current?.focus();  // focus back to main input
    }

    const onMainInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddSubmit();
        }
    }

    const onInlineInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(saveInlineEdit());
        } else if (e.key === 'Escape') {
            dispatch(cancelInlineEdit());
        }
    }


    return (

        <div className={'container'}>
            <h1>TODO LIST</h1>
            <hr/>
            {/* Main input for adding new jobs */}
            <div className={'add-menu'}>
                <input
                    type="text"
                    placeholder={'Add new item...'}
                    value={job}
                    onChange={(e) => dispatch(setJob(e.target.value))}
                    onKeyDown={onMainInputKeyDown}
                    ref={mainInputRef}
                    disabled={editingIndex !== null} // disable main input during inline edit
                />
                <button
                    type="button"
                    onClick={handleAddSubmit}
                    disabled={editingIndex !== null} // disable add button during inline edit
                >
                    Add
                </button>
            </div>

            {/* List of jobs */}
            <ul className={'task-list'}>
                {jobs.length === 0 && <p>No tasks yet. Add one!</p>}
                {
                    jobs.map((jobItem, index) => {
                        return (
                            <li
                                key={index}
                                style={{
                                    backgroundColor: editingIndex === index ? '#f0f8ff' : '#ffffff'
                                }}
                            >

                                {/* editingIndex === index ? Inline Edit Mode : Display Mode */}

                                {editingIndex === index ? (
                                    // --- Inline Edit Mode ---
                                    <>
                                        <input
                                            type="text"
                                            value={currentEditText}
                                            onChange={(e) => dispatch(setCurrentEditText(e.target.value))}
                                            onKeyDown={onInlineInputKeyDown}
                                            ref={inlineEditInputRef}
                                        />
                                        <button
                                            type="button"
                                            className={'update-btn'}
                                            onClick={() => dispatch(saveInlineEdit())}
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className={'cancel-btn'}
                                            onClick={() => dispatch(cancelInlineEdit())}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    // --- Display Mode ---
                                    <>
                                        <span style={{flexGrow: 1, marginRight: '10px', wordBreak: 'break-word'}}>{jobItem}</span>
                                        <div style={{flexShrink: 0}}>
                                            <button
                                                type="button"
                                                className={'edit-btn'}
                                                onClick={() => dispatch(startInlineEdit(index))}
                                                disabled={editingIndex !== null} // Disable other edit buttons while one is active
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className={'delete-btn'}
                                                onClick={() => dispatch(deleteJob(index))}
                                                disabled={editingIndex !== null} // Disable delete during edit
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default App
