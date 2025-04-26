import { ArrowDownAZ, Bird, Plus, Trash2 } from "lucide-react";
import TodoItem from "./TodoItem";
import React, { useState } from 'react'

const TodoPage = () => {

    const [todos, setTodos] = useState([]);
    function handleFormSubmit(e) {
        e.preventDefault();
        const todoText = e.target.todo.value;
        if (!todoText) return; // Prevent empty text
        e.target.reset();
        console.log(todoText);
        const newTodo = [{ id: todos.length + 1, text: todoText, completed: false}, ...todos];
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

    function handleTodoUpdate(id, newTodoText) {
        if(!newTodoText) return; // Prevent empty text
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text: newTodoText };
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function handleTodoMoveUp(index) {
        if (index === 0) return; // Already at the top
        const updatedTodos = [...todos];
        [updatedTodos[index], updatedTodos[index - 1]] = [updatedTodos[index - 1], updatedTodos[index]];
        setTodos(updatedTodos);
    }

    function handleTodoMoveDown(index) {
        if (index === todos.length - 1) return; // Already at the bottom
        const updatedTodos = [...todos];
        [updatedTodos[index], updatedTodos[index + 1]] = [updatedTodos[index + 1], updatedTodos[index]];
        setTodos(updatedTodos);
    }

    const emptyState = (
    <div className="mt-18 flex flex-col gap-4 items-center text-secondary-text">
        <Bird size={100}/>
        <h2>Nothing's here. Add a Todo.</h2>
    </div>)
    const completedTasks = todos.filter((todo) => todo.completed).length;
    const isTodoEmpty = todos.length === 0;
    const isTodoSorted = todos.every((todo, index) => {
        if (index === 0) return true; // First element is always sorted
        return todo.text >= todos[index - 1].text;
    });

  return (
    <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
      <h1 className="font-display text-6xl font-bold text-accent text-center">Todo App</h1>
      <p className="text-center text-lg font-light text-secondary-text italic">Manage your Todos with Ease!</p>
      <form className="bg-gray-700 px-6 py-4 rounded-lg flex justify-between gap-4" onSubmit={handleFormSubmit}>
        <input className="flex-1 font-body focus:outline-none" type="text" name='todo' placeholder='Enter Your task here...' required />
        <button className="p-3 bg-accent text-black rounded-lg cursor-pointer hover:bg-accent-hover"><Plus/></button>
      </form>

        <div className="flex justify-center gap-6">
            
            {!isTodoSorted && <button className="px-4 py-2 ring-2 ring-accent rounded-lg flex gap-2 items-center hover:bg-accent hover:text-black cursor-pointer" onClick={handleSortAllTodos}> <ArrowDownAZ size={24}/>Sort All</button> }
            {!isTodoEmpty && <button className="px-4 py-2 ring-2 ring-red-400 rounded-lg flex gap-2 items-center hover:bg-red-400 hover:text-black cursor-pointer" onClick={handleDeleteAllTodos}><Trash2 size={24}/> Delete All</button>}
        </div>

        {
            !isTodoEmpty && ( <p className="text-secondary-text text-right my-10">{completedTasks}/{todos.length} Completed</p>)
        }
        

        {isTodoEmpty ? emptyState : 
        <div className="space-y-4">
            {todos.map((todo, index ) => (
                   <TodoItem key={todo.id} todo={todo} onTodoToggle={handleCheckboxToggle} onTodoDelete={handleTodoDelete} onTodoUpdate={handleTodoUpdate} onMoveUp={handleTodoMoveUp} onMoveDown={handleTodoMoveDown} index={index} todosCount={todos.length}/>
            ))}
        </div>
        }

      
    </div>
  )
}

export default TodoPage
