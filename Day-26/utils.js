import {putData, deleteData} from "./apis.js";

const bindRow = (rootE, data) => {
    const todoItem = createTodoItem(rootE, data);
    rootE.appendChild(todoItem);
}

function createTodoItem(rootE, data) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const {id, title, completed} = data;

    const todoContent = document.createElement("div");
    todoContent.textContent = title;
    todoContent.classList.add("todo-content");
    if (completed) todoContent.classList.add("completed");
    todoItem.onclick = async () => {
        await putData('todos', id, {id, title, completed: !completed}); // update to server
        todoContent.classList.toggle("completed"); // update to UI
    }

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn", "fa-solid", "fa-pen-to-square");
    editButton.addEventListener("click", event => {
        event.stopPropagation(); // todoItem contains editButton and also has click event
        onEdit(event, rootE, data);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del-btn", "fa-solid", "fa-trash");
    deleteButton.onclick = async (event) => {
        event.stopPropagation(); // todoItem contains deleteButton and also has click event
        await deleteData('todos', id); // update to server
        rootE.removeChild(todoItem); // update to UI
    }

    todoItem.append(todoContent, editButton, deleteButton);
    return todoItem;
}

const bindRows = async (rootE, listOfData) => {
    rootE.innerHTML = ''; // reset UI
    listOfData.forEach(data => bindRow(rootE, data));
}

function onEdit(event, rootE, data) {
    const todoItem = event.target.closest(".todo-item");
    const title = todoItem.querySelector(".todo-content").textContent;

    // create an editElement
    const editElement = document.createElement("div");
    editElement.classList.add("add-todo");
    editElement.innerHTML =
        `<input type="text" class="todo-input" value="${title}">
            <button type="submit" class="add-btn"">Add Task</button>`

    /* user can either click on the "add" (update) button
     * or press key "Enter" while inputting / editing
     * to trigger onUpdate
     */
    const updateButton = editElement.querySelector(".add-btn");
    const editInput = editElement.querySelector("input");
    updateButton.addEventListener("click", async (event) => {
        await onUpdate(event, rootE, data);
    });
    editInput.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await onUpdate(event, rootE, data);
        }
    });

    // replace the current todoItem with this "temporary" editElement
    rootE.replaceChild(editElement, todoItem);
}

async function onUpdate(event, rootE, data) {
    const editElement = event.target.closest(".add-todo");
    const editInput = editElement.querySelector("input");

    let {id, completed} = data;
    const title = editInput.value.trim();  // update value for title
    await putData('todos', id, {id, title, completed}); // update to server
    // update to UI
    const newTodoItem = createTodoItem(rootE, {id, title, completed});
    rootE.replaceChild(newTodoItem, editElement);
}

export {bindRow, bindRows};