import './AddTodo.css';

interface newTodoProp {
    title: string,
    getNewTodoTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
    addTodo: () => void,
}

function AddTodo(newTodo: newTodoProp){
    return (
        <div className="add-todo">
            <input placeholder="Enter title" value={newTodo.title} onChange={newTodo.getNewTodoTitle}></input>
            <button onClick={newTodo.addTodo}>Add</button>
        </div>
    );
}

export default AddTodo;