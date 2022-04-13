import './Todo.css';

interface TodoType {
    id: number,
    title: string,
    status: string,
    isEditDisplay: boolean,
    editTodoId: number,
    updateTodo: (index: number) => void,
    displayEditTodo: (index: number) => void,
    editTodo: (index: number) => void,
    cancelEditTodo: () => void,
    deleteTodo: (index: number) => void,
    getEditedTodoTitle: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Todo(todo: TodoType){
    return (
        <tr>
            <td className='todo-id'>{todo.id + 1}</td>
            <td className='todo-title'>
                {(todo.editTodoId === todo.id) ?
                    (todo.isEditDisplay) ? <p>{todo.title}</p> : <input defaultValue={todo.title} onChange={todo.getEditedTodoTitle}></input>
                    :
                    <p>{todo.title}</p>
                }
            </td>
            <td className='todo-status'>{todo.status}</td>
            <td className='todo-action'>
                {(todo.editTodoId === todo.id) ?
                    (todo.isEditDisplay) ? 
                        <TodoAction id={todo.id} updateTodo={todo.updateTodo} displayEditTodo={todo.displayEditTodo} deleteTodo={todo.deleteTodo}/>
                        :
                        <EditTodoAction id={todo.id} editTodo={todo.editTodo} cancelEditTodo={todo.cancelEditTodo} />
                    :
                    <TodoAction id={todo.id} updateTodo={todo.updateTodo} displayEditTodo={todo.displayEditTodo} deleteTodo={todo.deleteTodo}/>
                }
            </td>
        </tr>
    );
}

function TodoAction(todo: Pick<TodoType, 'id' | 'updateTodo' | 'displayEditTodo'|'deleteTodo'>){
    return (
        <div>
            <button className='update-btn' onClick={() => {todo.updateTodo(todo.id)}}>Update</button>
            <button className='edit-btn' onClick={() => {todo.displayEditTodo(todo.id)}}>Edit</button>
            <button className='delete-btn' onClick={() => {todo.deleteTodo(todo.id)}}>Delete</button>
        </div>
    );
}

function EditTodoAction(todo: Pick<TodoType, 'id'| 'editTodo' | 'cancelEditTodo'>){
    return (
        <div className='edit-todo-action'>
            <button className='update-edit-btn' onClick={() => {todo.editTodo(todo.id)}}>OK</button>
            <button className='cancel-edit-btn' onClick={todo.cancelEditTodo}>Cancel</button>
        </div>
    );
}

export default Todo;