import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import './TodoList.css';

interface TodoType{
    title: string,
    status: string
}
enum todoStatus{
    inProgress = "In progress",
    done = "Done"
}

const initTodoList: TodoType[] = [
    {
        title: "Todo 1",
        status: todoStatus.inProgress
    },
    {
        title: "Todo 2",
        status: todoStatus.inProgress
    },
    {
        title: "Todo 3",
        status: todoStatus.done
    },
    {
        title: "Todo 4",
        status: todoStatus.inProgress
    },
    {
        title: "Todo 5",
        status: todoStatus.inProgress
    },
    {
        title: "Todo 6",
        status: todoStatus.inProgress
    }
]

function TodoList(){
    const [newTodo, setNewTodo] = useState('');
    const [todoList, setTodoList] = useState(initTodoList);
    const [editedTodo, setEditedTodo] = useState('');
    const [isEditDisplay, setIsEditDisplay] = useState(true);
    const [editTodoId, setEditTodoId] = useState(0);

    const getNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
    }

    const getEditedTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTodo(event.target.value);
    }

    const addTodo = () => {
        if (newTodo){
            const newTodoList: TodoType[] = [
                ...todoList,
                {
                    title: newTodo,
                    status: todoStatus.inProgress,
                }
            ];
            setTodoList(newTodoList);
        }
        setNewTodo('');
    }

    //map
    const updateTodo = (todoId: number) => {
        const newTodoList: TodoType[] = [...todoList];
        newTodoList.map((newTodo: TodoType, index: number) => {
            if (index === todoId){
                newTodo.status === todoStatus.inProgress ? newTodo.status = todoStatus.done : newTodo.status = todoStatus.inProgress;
            };
        })
        setTodoList(newTodoList);
    }

    const displayEditTodo = (todoId: number) => {
        setEditTodoId(todoId)
        setIsEditDisplay(false);
        //console.log(isEditDisplay);
    }

    const cancelEditTodo = () => {
        setIsEditDisplay(true);
        //console.log(isEditDisplay);
    }

    const editTodo = (todoId: number) => {
        const newTodoList: TodoType[] = [...todoList];
        if (editedTodo){
            //newTodoList[index].title = editedTodo;
            newTodoList.map((newTodo: TodoType, index: number) => {
                if (index === todoId && newTodo.status === todoStatus.inProgress){
                    newTodo.title = editedTodo;
                };
            })
        }
        setTodoList(newTodoList);
        cancelEditTodo();
    }

    const deleteTodo = (index: number) => {
        const newTodoList: TodoType[] = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    return (
        <>
            <AddTodo title={newTodo} getNewTodoTitle={getNewTodoTitle} addTodo={addTodo} />

            <table className='todolist'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {todoList.map((todo, index) => {
                    return <Todo key={index} id={index} title={todo.title} status={todo.status} isEditDisplay={isEditDisplay} editTodoId={editTodoId}
                        updateTodo={updateTodo} displayEditTodo={displayEditTodo} editTodo={editTodo}
                        cancelEditTodo={cancelEditTodo} deleteTodo={deleteTodo} getEditedTodoTitle={getEditedTodoTitle} />;
                })}
            </tbody>
            </table>
        </>
    );
}

export default TodoList;