import React from 'react'

const TodoItem = ({todo, onTodoToggle, onTodoDelete}) => {
  return (
    <div>
      <input id={todo.id} checked={todo.completed} type="checkbox" onChange={(e) => onTodoToggle(todo.id, e.target.checked)}/>
      <label
      style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
       htmlFor={todo.id}>{todo.text}</label>
       <button onClick={() =>  onTodoDelete(todo.id)}>Delete</button>
    </div>
  )
}

export default TodoItem
