import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div className='todo-container'>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          setEdit={setEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;