import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import '../styles/TodoList.css'; 

function TodoList({ todos, completeTodo, removeTodo, updateTodo, categories }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    categoryId: null,
    priority: 'medium'
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      categoryId: null,
      priority: 'medium'
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} categories={categories} />;
  }

  return (
    <div className='todo-container'>
      {todos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
          No tasks found. Add a task or adjust your filters.
        </div>
      )}
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          setEdit={setEdit}
          categories={categories}
        />
      ))}
    </div>
  );
}

export default TodoList;