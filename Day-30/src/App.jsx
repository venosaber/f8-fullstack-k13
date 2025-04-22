/*
                                       ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
                                       │                                                                                                 │
                                       │                                                                                                 │
                                       │   inputValue = inputE.value.trim() ────────►  body {id, title} ──────► postData(endpoint,body) ─┼──────► fullData  ────► bindRow
                                       └─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                               ▲                                              ▲ onSave()
                                                               │                                              │
                                ┌──────────────────────────────┼──────────────────────────────────────────────┼────────────────────────────┐
                                │                              │                                              │                            │
                                │                              │                                              │                            │
                                │            h1                │                                              │                            │
                                │                              │                                              │                            │
                                │     ┌────────────────────────┼──────────────────────────────────────────────┼─────────────────────────┐  │
                                │     │                        │                                              │                         │  │
                                │     │   ┌────────────────────┼──────────────────────────────────────────────┼────────────────────┐    │  │
                                │     │   │   ┌────────────────┼────────────────────────┐   ┌─────────────────┼──┐                 │    │  │
                                │     │   │   │  .todo-input   │                        │   │  #add-todo-btn  └─ │                 │    │  │
                                │     │   │   │                                         │   │                    │                 │    │  │
                                │     │   │   └─────────────────────────────────────────┘   └────────────────────┘                 │    │  │
                                │     │   │                div.add-todo                                                            │    │  │
                                │     │   └────────────────────────────────────────────────────────────────────────────────────────┘    │  │
                                │     │                                                                                                 │  │
                                │     │   ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │  │
                                │     │   │                                                                                         │   │  │
                  ┌─────────────┼─────┼───┼──►                                                                                      │   │  │
                  │             │     │   │      ┌─────────────────────────────────────────────────────────────────────────────┐    │   │  │
                  │             │     │   │      │ ┌────────────────────────┐         ┌───────────────┐     ┌───────────────┐  │    │   │  │
                  │             │     │   │      │ │                        │         │               │     │               │  │    │   │  │
   ┌───────────────────────────┐│     │   │      │ │                        │         │button.edit-btn│     │button.del-btn─┼──┼────┼───┼──┼───────►deleteData(endpoint,id)
   │    bindRow(rootE, data)   ││     │   │      │ │ div.todo-content       │         │       │       │     │               │  │    │   │  │
   │                          ─│┼─────┼───┼──────┼►└────────────────────────┘         └───────┼───────┘     └───────────────┘  │    │   │  │
   │bindRows(rootE, listOfData)││     │   │      │                                            │                                │    │   │  │
   │                           ││     │   │      │            div.todo-item                   │                                │    │   │  │
   │                     ▲     ││     │   │      └────────────────────────────────────────────┼────────────────────────────────┘    │   │  │
   │                     │     ││     │   │                          ▲                        │                                     │   │  │
   │                     │     ││     │   │                          │                        │                                     │   │  │
   │                     │     ││     │   │                          │                        │                                     │   │  │
   │                     │     ││     │   │                          │                        │                                     │   │  │
   │                     │     ││     │   │                          │                        │                                     │   │  │
   │                     │     ││     │   │                          │                        │                                     │   │  │
   │                           ││     │   └──────────────────────────┼────────────────────────┼─────────────────────────────────────┘   │  │
   │          getData(endpoint)││     │                              │                        │                                         │  │
   │                           ││     └──────────────────────────────┼────────────────────────┼─────────────────────────────────────────┘  │
   └───────────────────────────┘│                                    │                        │                                            │
                                └────────────────────────────────────┼────────────────────────┼────────────────────────────────────────────┘
                                                                     │                        │
                                                                     │                        ▼
                                                                     │
                                                                     │                  onEdit(event, rootE, data)
                                                 replace .add-todo   │
                                                                     │                        │
                                                                     │                        │ replace .todo-item with
                                                                     │                        ▼
                                                                     │     ┌──────────────────────────────────────────────────────────────────┐
                                                                     │     │                            div.add-todo                          │
                                                                     │     │                                                                  │
                                                                     │     │    ┌─────────────────────────┐        ┌──────────────────────┐   │
                                                                     │     │    │   .todo-input           │        │      .add-btn        │   │
                                                                     │     │    │          │              │        │                     ││   │
                                                                     │     │    └──────────┼──────────────┘        └─────────────────────┼┘   │
                                                                     │     └───────────────┼─────────────────────────────────────────────┼────┘
                                                                     │                     │                                             │
                                                                     │                     ▼                                             ▼
                                                                     │         event keydown -> onUpdate(event,rootE,data)  ◄───────── event click
                                                                     │
                                                                     │                                    │
                                                                     └────────────────────────────────────┘

 */
import {useEffect, useState} from 'react'
import {getData, postData, putData, deleteData} from './apis.js'

import './App.css'
import TodoItem from "./components/TodoItem/index.jsx";
import AddTaskInput from "./components/AddTaskInput/index.jsx";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Retrieve data from the server to display the UI
    useEffect(() => {
        const fetchData = async () => {
            try {
                const todoTasks = await getData('todos');
                setTasks(todoTasks);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("Fetching data error, please try reloading this page again!")
            }
        };

        fetchData();
    }, []);

    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    }

    const addTask = async () => {
        const title = inputValue.trim();
        if(title === '') return;    // check if the task is empty
        // check if the task is duplicated
        const isDuplicated = tasks.some(task => task.title.toLowerCase() === title.toLowerCase());
        if(isDuplicated){
            alert('Task already exists!');
            return;
        }

        // create a temporary id - use only at client side, won't be sent to server
        const tempId = crypto.randomUUID();

        // Optimistic UI update
        const optimisticTask = {tempId, title, completed: false};
        setTasks(tasks => [...tasks, optimisticTask]);
        setInputValue(''); // reset the value in input

        // update to server
        const body = {title, completed: false};
        try {
            const newTask = await postData('todos', body); // newTask has real id and no tempId
            setTasks(currentTasks => { // replace the temporary task with the new task
                return currentTasks.map(task => task.tempId === tempId ? newTask : task);
            });
        }catch (error) {
            console.error('Error adding task:', error);
            setTasks(currentTasks => { // rollback by removing the temporary task
                return currentTasks.filter(task => task.tempId !== tempId);
            });
            alert("There is an error while adding task, please try again!")
        }
    };

    const deleteTask = async (id, tempId) => {
        let taskToDelete = null;
        let deleteIndex = -1;

        // Optimistic UI update
        setTasks(currentTasks => {
            return currentTasks.filter((task,index) => {
                if((task.id && task.id === id) || (task.tempId && task.tempId === tempId)) {
                    taskToDelete = task;
                    deleteIndex = index;
                    return false;
                }
                return true;
            });
        });

        // update to server just in case the id is real
        if(id && !tempId) {
            try {
                await deleteData('todos', id);
            }catch (error) {
                console.error('Error deleting task:', error);
                setTasks(currentTasks => { // rollback by adding the task back
                    const revertedTasks = [...currentTasks];
                    revertedTasks.splice(deleteIndex, 0, taskToDelete);
                    return revertedTasks;
                });
                alert("There is an error while deleting task, please try again!")
            }
        }else{
            // removed an optimistic task, no need to update to server
        }
    }

    return (
        <>
            <div className="container">
                <h1>Get Things Done !</h1>
                <form className="todo-form" onSubmit= {e => {e.preventDefault(); addTask();}}>
                    <AddTaskInput inputValue={inputValue} onChangeInput={onChangeInput} />
                    <div className="todo-list">
                        {
                            tasks.map((task) => {
                                const {id, tempId} = task;
                                const key = id ?? tempId;   // if the task is optimistic, id would be undefined => use tempId as the key
                                return (
                                    <TodoItem task={task} deleteTask={deleteTask} key={key}/>
                                );
                            })
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default App
