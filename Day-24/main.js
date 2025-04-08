/*

                                                                                    ┌─────────────────────────────────────► createTodoItem(taskContent)
                                                                                    │                                                              │
   ┌─────────────────────────────────────────────────────────────┐                  │                                                              │
   │ .container                       .value.trim()              │      ┌───────────┴─┐       .value.trim()                                        │
   │                              ┌──────────────────────────────┼─────►│taskContent  │◄───────────┐     ◄──────┐                                  │
   │           h1                 │                              │      └─────────────┘            │            │                                  │
   │       ┌──────────────────────┼────────────────────────────┐ │                                 │            │                                  │
   │       │   form               │                            │ │                                 │            │                                  │
   │       │                      │                            │ │                                 │            │                                  │
   │       │  ┌───────────────────┼──────────────────────┐     │ │                                 │            │                                  │
   │       │  │.add-todo          │                      │     │ │               ┌─────────────────┼────────────┼──────────────────────────┐ todoList.replaceChild
   │       │  │  ┌────────────────┼────┐ ┌─────────┐     │     │ │               │                 │            │  .add-todo            ───┼──────►│
   │       │  │  │  input              │ │.add-btn │     │     │ │               │                 │            │                          │       │
   │       │  │  └─────────────────────┘ └─────────┘     │     │ │               │ ┌───────────────┼────────────┼─────────┐ ┌─────────────┐│       │
   │       │  └──────────────────────────────────────────┘     │ │               │ │               │            │         │ │             ││       │
   │       │ ┌──────────────────────────────────────────────┐  │ │               │ │               │            │         │ │ updateButton││       │
   │       │ │ .todo-list                                   │  │ │               │ │     editInput              │         │ │             ││       │
   │       │ │                                              │  │ │               │ │                            │         │ │             ││       │
   │       │ │┌──────────────────────────────────────────┐  │  │ │               │ │         │                  │         │ │      │      ││       │
   │       │ ││ .todo-item                               │  │  │ │               │ └─────────┼──────────────────┼─────────┘ └──────┼──────┘│       │
   │       │ ││  ┌───────────────────┐ ┌───────┐┌──────┐ │  │  │ │               └───────────┼──────────────────┼──────────────────┼───────┘       │
   │       │ ││  │                   │ │ .edit ││.del  │ │  │  │ │                           │                  │                  │               │
   │       │ ││  │  .todo-content    │ │  -btn ││ -btn │ │◄────┼─┼────────┐                  │                  │                  │               │
   │       │ ││  └───────────────────┘ └───────┘└──────┘ │  │  │ │        │                  │          ┌───────┼─────────┐        │               │
   │       │ │└──────────────────────────────────────────┘  │  │ │        │                  │          │                 │        │               │
   │       │ │┌─────────────────────────────────────────┐   │  │ │        │                  └─────────►│ updateFunction  │ ◄──────┘               │
   │       │ ││  .todo-item                             │   │  │ │        │                             └─────────────────┘                        │
   │       │ ││                                         │   │  │ │        │               e.key === "Enter"                 .onclick               │
   │       │ │└─────────────────────────────────────────┘   │  │ │        │                                                                        │
   │       │ │                                              │  │ │        │                                                                        │
   │       │ │                                              │  │ │        │                                                                        │
   │       │ └──────────────────────────────────────────────┘  │ │        │                                                                        │
   │       │                                                   │ │        │                                                                        │
   │       └───────────────────────────────────────────────────┘ │        │                                     ┌──────────────────────────────────┼───────┐
   │                                                             │        │                                     │                                  ▼       │
   └─────────────────────────────────────────────────────────────┘        │     todoList .appendChild           │                                          │
                                                                          └─────────────────────────────────────┼───                   todoItem            │
                                                                                                                │                                          │
                                                                                                                │                                          │
                                                                                                                └──────────────────────────────────────────┘

 */
const todoInput = document.querySelector("input");
const addButton = document.querySelector("#add-todo-btn");
const todoList = document.querySelector(".todo-list");
const formElement = document.querySelector("form");

formElement.onsubmit = e => e.preventDefault();

// add new todo item to the todoList
addButton.addEventListener("click", () => {
    let taskContent = todoInput.value.trim();
    if (!taskContent) return;
    const todoItem = createToDoItem(taskContent);
    todoList.appendChild(todoItem);
    // reset for next input
    todoInput.value = "";
});

const updateFunction = event => {
    const editElement = event.target.closest(".add-todo");
    const editInput = editElement.querySelector("input");

    // update new value from the input of editElement
    const taskContent = editInput.value.trim();
    const newTodoItem = createToDoItem(taskContent);
    todoList.replaceChild(newTodoItem, editElement);
}

const editFunction = event => {
    const todoItem = event.target.closest(".todo-item");
    const taskContent = todoItem.querySelector(".todo-content").textContent;

    // create an editElement
    // the taskContent is default value to be edited in the input
    const editElement= document.createElement("div");
    editElement.classList.add("add-todo");
    editElement.innerHTML =
        `<input type="text" class="todo-input" value="${taskContent}">
            <button type="submit" class="add-btn"">Add Task</button>`

    /* user can either click on the "add" (update) button
     * or press key "Enter" while inputting / editing
     * to trigger updateFunction
     */
    const updateButton = editElement.querySelector(".add-btn");
    const editInput = editElement.querySelector("input");
    updateButton.onclick = updateFunction;
    editInput.addEventListener("keydown", event =>{
        if(event.key === "Enter"){
            event.preventDefault();
            updateFunction(event);
        }
    })

    // replace the current todoItem with a "temporary" editElement
    todoList.replaceChild(editElement, todoItem);
}

function createToDoItem(taskContent){
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");
    todoContent.textContent = taskContent;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn", "fa-solid", "fa-pen-to-square");
    editButton.onclick = editFunction;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del-btn", "fa-solid", "fa-trash");
    deleteButton.onclick = () => todoList.removeChild(todoItem);

    todoItem.append(todoContent,editButton,deleteButton);
    return todoItem;
}
