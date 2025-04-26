import TodoItem from "./TodoItem";
import React, { useState } from 'react'

const TodoPage = () => {

    const [todos, setTodos] = useState([]);
    function handleFormSubmit(e) {
        e.preventDefault();
        const todoText = e.target.todo.value;
        const todoTargetDate = e.target.todoTargetDate.value;
        if (!todoText) {
            alert('Please enter a todo item.');
            return;
        }
        e.target.reset();
        console.log(todoText);
        const newTodo = [{ id: todos.length + 1, text: todoText, completed: false, date: todoTargetDate }, ...todos];
        setTodos(newTodo);
    }


    function handleCheckboxToggle(id, checked) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: checked };
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function handleTodoDelete(id) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function handleDeleteAllTodos() {
        const confirmDelete = window.confirm('Are you sure you want to delete all todos?');
        if (confirmDelete) {
            setTodos([]);
        }
    }

    function handleSortAllTodos() {
       //Sort in the alphabetical order of the text
        const sortedTodos = [...todos].sort((a, b) => a.text.localeCompare(b.text));
        setTodos(sortedTodos);
    }

    const emptyState = <h2>No tasks available. Add a new Todo</h2>;
    const completedTasks = todos.filter((todo) => todo.completed).length;
    const pendingTasks = todos.filter((todo) => !todo.completed).length;
    const isTodoEmpty = todos.length === 0;
    const isTodoSorted = todos.every((todo, index) => {
        if (index === 0) return true; // First element is always sorted
        return todo.text >= todos[index - 1].text;
    });

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name='todo' placeholder='Enter Your task here...' />
        <input type="date" name='todoTargetDate' placeholder='Date'/>
        <button>Submit</button>
      </form>

        <br />
        <br />
        {!isTodoEmpty && <button onClick={handleDeleteAllTodos}>Delete All</button>}
        {!isTodoSorted&& <button onClick={handleSortAllTodos}>Sort All</button> }
    
    <hr />
        {isTodoEmpty ? emptyState : 
        <div>
            <h2>Tasks List</h2>
            <h4>{completedTasks}/{todos.length} Completed</h4>
            {todos.map((todo ) => (
                   <TodoItem key={todo.id} todo={todo} onTodoToggle={handleCheckboxToggle} onTodoDelete={handleTodoDelete}/>
            ))}
        </div>
        }

      
    </div>
  )
}

export default TodoPage
