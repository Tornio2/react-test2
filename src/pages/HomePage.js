import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import CategoryManager from '../components/CategoryManager';
import FilterBar from '../components/FilterBar';
import StatsPanel from '../components/StatsPanel';
import Modal from '../components/Modal';
import { FaCog } from 'react-icons/fa';

function HomePage({ 
  todos, setTodos, 
  categories, setCategories, 
  darkMode, 
  stats, 
  filter, setFilter, 
  sortMethod, setSortMethod, 
  sortedTodos,
  addTodo, removeTodo, updateTodo, completeTodo, archiveTodo, restoreTodo
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // Open category manager
  const openCategoryManager = () => {
    setModalContent('categories');
    setShowModal(true);
  };

  // Add new category
  const addCategory = (category) => {
    if (!category.name || /^\s*$/.test(category.name)) {
      return;
    }
    
    const newCategory = {
      id: Math.floor(Math.random() * 10000),
      name: category.name,
      color: category.color || '#' + Math.floor(Math.random()*16777215).toString(16)
    };
    
    setCategories([...categories, newCategory]);
  };

  // Remove category
  const removeCategory = (id) => {
    // Remove category from list
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    
    // Update todos that had this category
    const updatedTodos = todos.map(todo => {
      if (todo.categoryId === id) {
        return { ...todo, categoryId: null };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <Header />
      
      <div className="top-actions">
        <Link to="/settings" className="settings-button">
          <FaCog /> Settings
        </Link>
        <button className="categories-button" onClick={openCategoryManager}>
          Manage Categories
        </button>
      </div>
      
      <TodoForm 
        onSubmit={addTodo} 
        categories={categories} 
      />
      
      <FilterBar 
        filter={filter} 
        setFilter={setFilter} 
        sortMethod={sortMethod} 
        setSortMethod={setSortMethod}
        categories={categories}
      />
      
      <TodoList
        todos={sortedTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        archiveTodo={archiveTodo}
        restoreTodo={restoreTodo}
        categories={categories}
      />
      
      <StatsPanel stats={stats} />
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalContent === 'categories' && (
            <CategoryManager 
              categories={categories}
              addCategory={addCategory}
              removeCategory={removeCategory}
              onClose={() => setShowModal(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default HomePage;