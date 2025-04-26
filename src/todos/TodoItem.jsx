import { Check, ChevronDown, ChevronUp, SquarePen, Trash, X } from 'lucide-react';
import React from 'react'
import CheckBox from './CheckBox';

const TodoItem = ({todo, onTodoToggle, onTodoDelete, onTodoUpdate, onMoveUp, onMoveDown, index, todosCount}) => {

  const [showEditTodo, setShowEditTodo] = React.useState(false);

  function handleEditFormSubmitted(e) {
    e.preventDefault();
    const newTodoText = e.target.todo.value;
    onTodoUpdate(todo.id, newTodoText);
    setShowEditTodo(false);
  }


  const todoEditForm = (
    <div className='flex justify-between items-center bg-gray-900 rounded-lg px-4 py-2 min-h-20 group'>
      <form className='flex-1 flex items-center gap-2 px-2' onSubmit={handleEditFormSubmitted}>
        <input className='flex-1 border-2 border-secondary-text px-4 py-2 rounded-lg font-body' required type="text" name='todo' defaultValue={todo.text}/>
        <button className='hover:bg-accent hover:text-black p-2 rounded-lg'><Check /></button>
      </form>
      <button className='text-red-400 hover:bg-red-400 hover:text-black p-2 rounded-lg' onClick={() => setShowEditTodo(false)}><X /></button>
      
    </div>
  )


  const todoItemDev = (
    <div className='flex justify-between gap-4 items-center hover:bg-gray-900 rounded-lg px-4 py-2 group'>
      <div className='flex flex-col gap-1'>
        <button className={` rounded-md p-1 cursor-pointer ${index === 0 ? 'text-secondary-text' : 'hover:bg-gray-700'}`} disabled={index === 0} onClick={() => onMoveUp(index)}><ChevronUp /></button>
        <button className={` rounded-md p-1 cursor-pointer ${index === todosCount-1 ? 'text-secondary-text' : 'hover:bg-gray-700'}`} disabled={index === todosCount-1} onClick={() => onMoveDown(index)}><ChevronDown /></button>
      </div>
      
      <div className='flex-1 flex gap-4 items-center'>
        <CheckBox id={todo.id} checked={todo.completed} onChange={(e) => onTodoToggle(todo.id, e.target.checked)} label={todo.text}/>
      </div>
      
       <div className='hidden group-hover:flex gap-4'>
        <button className='hover:bg-accent hover:text-black p-2 rounded-lg' onClick={() => setShowEditTodo(true)}><SquarePen /></button>
        <button className='text-red-400 hover:bg-red-400 hover:text-accent p-2 rounded-lg' onClick={() =>  onTodoDelete(todo.id)}><Trash /></button>
       </div>
       
    </div>
  )

  return (
    <div className='border-t border-secondary-text pt-3 '>
      {showEditTodo ? todoEditForm : todoItemDev}
    </div>
  )
}

export default TodoItem
