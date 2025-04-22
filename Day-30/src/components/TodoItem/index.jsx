function TodoItem({task, deleteTask}){
    const {id,tempId,title,completed} = task;
    return (
        <div className="todo-item">
            <div className={`todo-content ${completed?'completed':''}`}>{title}</div>
            <button className="edit-btn fa-solid fa-pen-to-square"></button>
            <button className="del-btn fa-solid fa-trash"
                    onClick = {()=>deleteTask(id,tempId)}></button>
        </div>
    );
}

export default TodoItem;