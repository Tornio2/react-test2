import React from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import '../styles/Todo.css';

function Todo({ todo, completeTodo, removeTodo, setEdit, categories }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    // Check if date is today
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } 
    // Check if date is yesterday
    else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Otherwise return full date
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const category = categories.find(cat => cat.id === todo.categoryId);

  return (
    <div
      className={`todo-row ${todo.isComplete ? 'complete' : ''} ${todo.priority ? 'priority-' + todo.priority : ''}`}
    >
      <div className="todo-info">
        <div className="todo-header">
          {category && (
            <span className="category-tag" style={{ backgroundColor: category.color }}>
              {category.name}
            </span>
          )}
          <span className="todo-date">
            Created: {formatDate(todo.dateCreated)}
          </span>
        </div>
        
        <div className="todo-text">
          <div 
            className="todo-checkbox" 
            onClick={() => completeTodo(todo.id)}
          >
            {todo.isComplete ? 
              <FaRegCheckCircle style={{color: 'var(--success)'}} /> : 
              <FaRegCircle style={{color: 'var(--text-secondary)'}} />
            }
          </div>
          {todo.text}
        </div>
      </div>
      
      <div className='icons'>
        <div 
          className="icon-btn" 
          onClick={() => setEdit({ 
            id: todo.id, 
            value: todo.text, 
            categoryId: todo.categoryId, 
            priority: todo.priority || 'medium',
            isComplete: todo.isComplete
          })}
        >
          <RiEdit2Line className='edit-icon' />
        </div>
        <div 
          className="icon-btn" 
          onClick={() => removeTodo(todo.id)}
        >
          <RiDeleteBinLine className='delete-icon' />
        </div>
      </div>
    </div>
  );
}

export default Todo;