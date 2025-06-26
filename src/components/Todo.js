import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';

function Todo({ todo, completeTodo, removeTodo, setEdit }) {
  return (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
    >
      <div 
        className="todo-checkbox" 
        onClick={() => completeTodo(todo.id)}
      >
        {todo.isComplete ? 
          <FaRegCheckCircle style={{color: '#10b981', marginRight: '10px'}} /> : 
          <FaRegCircle style={{color: '#6b7280', marginRight: '10px'}} />
        }
      </div>
      <div 
        className="todo-text" 
        onClick={() => completeTodo(todo.id)}
      >
        {todo.text}
      </div>
      
      <div className='icons'>
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
      </div>
    </div>
  );
}

export default Todo;