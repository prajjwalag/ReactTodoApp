import React from 'react'

const TodoItem = ({todo, onTodoToggle, onTodoDelete, onTodoUpdate, onMoveUp, onMoveDown, index, todosCount}) => {

  const [showEditTodo, setShowEditTodo] = React.useState(false);

  function handleEditFormSubmitted(e) {
    e.preventDefault();
    const newTodoText = e.target.todo.value;
    onTodoUpdate(todo.id, newTodoText);
    setShowEditTodo(false);
  }


  const showEditTodoForm = (
    <div>
      <form onSubmit={handleEditFormSubmitted}>
        <input type="text" name='todo' defaultValue={todo.text}/>
        <button>Update</button>
      </form>
      <button onClick={() => setShowEditTodo(false)}>Cancel</button>
      
    </div>
  )


  const todoItemDev = (
    <div>
      <button disabled={index === 0} onClick={() => onMoveUp(index)}>🔼</button>
      <button disabled={index === todosCount-1} onClick={() => onMoveDown(index)}>🔽</button>
      <input id={todo.id} checked={todo.completed} type="checkbox" onChange={(e) => onTodoToggle(todo.id, e.target.checked)}/>
      <label
      style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
       htmlFor={todo.id}>{todo.text}</label>
       <button onClick={() => setShowEditTodo(true)}>Edit</button>
       <button onClick={() =>  onTodoDelete(todo.id)}>Delete</button>
    </div>
  )

  return (
    <>
      {showEditTodo ? showEditTodoForm : todoItemDev}
    </>
  )
}

export default TodoItem
