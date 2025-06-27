import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../styles/TodoForm.css'; 

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [categoryId, setCategoryId] = useState(props.edit ? props.edit.categoryId : '');
  const [priority, setPriority] = useState(props.edit ? props.edit.priority : 'medium');
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleCategoryChange = e => {
    setCategoryId(e.target.value === '' ? null : parseInt(e.target.value));
  };

  const handlePriorityChange = e => {
    setPriority(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    props.onSubmit({
      id: props.edit ? props.edit.id : Math.floor(Math.random() * 10000),
      text: input,
      isComplete: props.edit ? props.edit.isComplete : false,
      categoryId,
      priority
    });
    
    setInput('');
    setCategoryId('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <div className="form-row">
        <input
          placeholder={props.edit ? 'Update task...' : 'Add a task...'}
          value={input}
          onChange={handleChange}
          name='text'
          ref={inputRef}
          className='todo-input'
        />
        
        <div className="form-group">
          <label>Category</label>
          <select 
            className="form-control" 
            value={categoryId || ''} 
            onChange={handleCategoryChange}
          >
            <option value="">None</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <select 
            className="form-control" 
            value={priority} 
            onChange={handlePriorityChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <button onClick={handleSubmit} className='todo-button'>
        {props.edit ? 'Update' : <><FaPlus style={{ marginRight: '5px' }} /> Add Task</>}
      </button>
    </form>
  );
}

export default TodoForm;