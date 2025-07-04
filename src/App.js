import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import Notification from './components/Notification';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // Notification state
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false,
    type: 'success'
  });

  // Auto-archive setting
  const [autoArchiveCompleted, setAutoArchiveCompleted] = useState(() => {
    const savedSetting = localStorage.getItem('autoArchiveCompleted');
    return savedSetting ? JSON.parse(savedSetting) : false;
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    } else {
      return [
        { id: 1, name: 'Work', color: '#ef4444' },
        { id: 2, name: 'Personal', color: '#3b82f6' },
        { id: 3, name: 'Shopping', color: '#10b981' },
        { id: 4, name: 'Health', color: '#8b5cf6' }
      ];
    }
  });
  
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    archived: 'active',
  });
  
  const [sortMethod, setSortMethod] = useState('date-desc');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({
      message,
      isVisible: true,
      type
    });
  };

   // Hide notification function
  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  // Save auto-archive setting to localStorage
  useEffect(() => {
    localStorage.setItem('autoArchiveCompleted', JSON.stringify(autoArchiveCompleted));
  }, [autoArchiveCompleted]);

  // Store todos in localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Store categories in localStorage
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Store dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Add Todo with category and priority
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
        showNotification('Task cannot be empty!', 'warning');

      return;
    }

    const newTodos = [
      {
        ...todo,
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        isArchived: false,
      }, 
      ...todos
    ];
    setTodos(newTodos);

    // Show notification when task is added
    showNotification('Task added!');
  };

  // Update existing Todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => {
      if (item.id === todoId) {
        return {
          ...newValue,
          dateUpdated: new Date().toISOString()
        };
      }
      return item;
    }));
  };

  // Remove Todo
  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
    showNotification('Task deleted!', 'error');

  };

  // Toggle todo completion
  const completeTodo = id => {
    const targetTodo = todos.find(todo => todo.id === id);
    
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        // If the task is being marked as complete and auto-archive is enabled
        if (!todo.isComplete && autoArchiveCompleted) {
          return {
            ...todo, 
            isComplete: true,
            completedAt: new Date().toISOString(),
            isArchived: true,
            archivedAt: new Date().toISOString()
          };
        } 
        // Otherwise just toggle the complete state
        else {
          return {
            ...todo, 
            isComplete: !todo.isComplete,
            completedAt: !todo.isComplete ? new Date().toISOString() : null
          };
        }
      }
      return todo;
    });
    setTodos(updatedTodos);
    
    // Show notifications based on what happened
    if (targetTodo && !targetTodo.isComplete) {
      if (autoArchiveCompleted) {
        showNotification('Task completed and archived!', 'info');
      } else {
        showNotification('Task completed!', 'success');
      }
    }
  };

  // Archive Todo
  const archiveTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo, 
          isArchived: true,
          archivedAt: new Date().toISOString()
        };
      }
      return todo;
    });
    showNotification('Task archived!', 'info');
    setTodos(updatedTodos);
  };

  // Restore archive Todo
  const restoreTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo, 
          isArchived: false,
          archivedAt: null
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  

  // Filter todos based on current filters
  const filteredTodos = todos.filter(todo => {
    // Filter by archived status
    if (filter.archived === 'active' && todo.isArchived) return false;
    if (filter.archived === 'archived' && !todo.isArchived) return false;
    
    // Filter by status
    if (filter.status === 'active' && todo.isComplete) return false;
    if (filter.status === 'completed' && !todo.isComplete) return false;
    
    // Filter by priority
    if (filter.priority !== 'all' && todo.priority !== filter.priority) return false;
    
    // Filter by category
    if (filter.category !== 'all' && todo.categoryId !== parseInt(filter.category)) return false;
    
    // Filter by search text
    if (filter.search && !todo.text.toLowerCase().includes(filter.search.toLowerCase())) return false;
    
    return true;
  });

  // Sort todos based on selected sort method
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortMethod) {
      case 'date-asc':
        return new Date(a.dateCreated) - new Date(b.dateCreated);
      case 'date-desc':
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      case 'priority-high':
        const priorityOrder = { high: 3, medium: 2, low: 1, undefined: 0 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'priority-low':
        const priorityOrderReverse = { high: 1, medium: 2, low: 3, undefined: 4 };
        return priorityOrderReverse[a.priority] - priorityOrderReverse[b.priority];
      case 'alphabetical':
        return a.text.localeCompare(b.text);
      default:
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
  });

  // Calculate statistics
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.isComplete && !todo.isArchived).length,
    completed: todos.filter(todo => todo.isComplete && !todo.isArchived).length,
    archived: todos.filter(todo => todo.isArchived).length,
    categories: categories.map(category => {
      const count = todos.filter(todo => todo.categoryId === category.id && !todo.isArchived).length;
      return { ...category, count };
    })
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                todos={todos}
                setTodos={setTodos}
                categories={categories}
                setCategories={setCategories}
                darkMode={darkMode}
                stats={stats}
                filter={filter}
                setFilter={setFilter}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
                sortedTodos={sortedTodos}
                addTodo={addTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                completeTodo={completeTodo}
                archiveTodo={archiveTodo}
                restoreTodo={restoreTodo}
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <SettingsPage 
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                todos={todos}
                categories={categories}
                stats={stats}
                setTodos={setTodos}
                setCategories={setCategories}

                autoArchiveCompleted={autoArchiveCompleted}
                setAutoArchiveCompleted={setAutoArchiveCompleted}
              />
            } 
          />
        </Routes>

        {/* Notification component */}
        <Notification
          message={notification.message}
          isVisible={notification.isVisible}
          onHide={hideNotification}
          type={notification.type}
        />
      </div>
    </Router>
  );
}

export default App;