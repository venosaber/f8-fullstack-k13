import {bindRow, bindRows} from "./utils.js";
import {getData, postData} from "./apis.js";

const todoInputE = document.querySelector("input");
const addButton = document.querySelector("#add-todo-btn");
const todoListE = document.querySelector(".todo-list");
const formElement = document.querySelector("form");

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
formElement.onsubmit = e => e.preventDefault();

const onSave = async () => {
    const inputValue = todoInputE.value.trim();
    if (!inputValue) return;
    const body = {
        title: inputValue,
        completed: false
    };
    /* body lacks id - which is necessary for later use of PUT and DELETE method
     * update to server and retrieve the result to get the id of data
     */
    const fullData = await postData('todos', body);
    await bindRow(todoListE, fullData); // update to UI
};

addButton.addEventListener("click", async () => {
    await onSave();
    // reset for next input
    todoInputE.value = "";
});

const todoTasks = await getData('todos');
await bindRows(todoListE, todoTasks);
