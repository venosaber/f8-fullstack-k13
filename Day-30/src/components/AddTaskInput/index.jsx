export default ({inputValue, onChangeInput}) => {
    return (
        <div className="add-todo">
            <input type="text"
                   className="todo-input"
                   placeholder="What is the task today?"
                   value={inputValue}
                   onChange={onChangeInput}/>
            <button type="submit" className="add-btn" id="add-todo-btn">Add Task</button>
        </div>
    )
}