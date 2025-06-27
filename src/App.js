import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/Header';
import CategoryManager from './components/CategoryManager';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import Modal from './components/Modal';
import { FaCog } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import { FaFileExport } from 'react-icons/fa';


function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
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
    archived: 'active', // Add new archived filter, default to showing only active
  });
  
  const [sortMethod, setSortMethod] = useState('date-desc');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

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
      return;
    }

    const newTodos = [
      {
        ...todo,
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        isArchived: false, // Add isArchived property
      }, 
      ...todos
    ];
    setTodos(newTodos);
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
  };

  // Toggle todo completion
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo, 
          isComplete: !todo.isComplete,
          completedAt: !todo.isComplete ? new Date().toISOString() : null
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Archive Task functionality
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

  // Open settings modal
  const openSettings = () => {
    setModalContent('settings');
    setShowModal(true);
  };

  // Open category manager
  const openCategoryManager = () => {
    setModalContent('categories');
    setShowModal(true);
  };


  // Add export functionality
  const exportData = (format) => {
    // Prepare the data to export
    const dataToExport = {
      todos,
      categories,
      stats: {
        total: stats.total,
        active: stats.active,
        completed: stats.completed,
        archived: stats.archived
      },
      exportDate: new Date().toISOString()
    };
    
    let fileContent;
    let fileType;
    let fileName;
    
    // Format based on selected format
    if (format === 'json') {
      fileContent = JSON.stringify(dataToExport, null, 2);
      fileType = 'application/json';
      fileName = 'task-manager-export.json';
    } else if (format === 'csv') {
      // Create CSV content
      let csvContent = 'ID,Text,Status,Priority,Category,Created Date,Updated Date,Completed Date,Archived Date\n';
      
      todos.forEach(todo => {
        const category = categories.find(cat => cat.id === todo.categoryId);
        const status = todo.isArchived ? 'Archived' : todo.isComplete ? 'Completed' : 'Active';
        
        csvContent += `${todo.id},"${todo.text.replace(/"/g, '""')}",`;
        csvContent += `${status},${todo.priority || 'none'},`;
        csvContent += `${category ? category.name : 'None'},`;
        csvContent += `${todo.dateCreated || ''},${todo.dateUpdated || ''},`;
        csvContent += `${todo.completedAt || ''},${todo.archivedAt || ''}\n`;
      });
      
      fileContent = csvContent;
      fileType = 'text/csv';
      fileName = 'task-manager-export.csv';
    }
    
    // Create a blob and download the file
    const blob = new Blob([fileContent], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="todo-app">
        <Header />
        
        <div className="top-actions">
          <button className="settings-button" onClick={openSettings}>
            <FaCog /> Settings
          </button>
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
            {modalContent === 'settings' && (
              <div className="settings-panel">
                <h2>Settings</h2>
                
                <div className="setting-section">
                  <h3>Appearance</h3>
                  <div className="setting-item">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                      />
                      Dark Mode
                    </label>
                  </div>
                </div>
                
                <div className="setting-section">
                  <h3>Export Data</h3>
                  <p className="setting-description">
                    Export your tasks, categories, and statistics to a file.
                  </p>
                  <div className="export-buttons">
                    <button 
                      className="export-button json-export" 
                      onClick={() => exportData('json')}
                      title="Export as JSON file"
                    >
                      <FaDownload /> Export as JSON
                    </button>
                    <button 
                      className="export-button csv-export" 
                      onClick={() => exportData('csv')}
                      title="Export as CSV file"
                    >
                      <FaDownload /> Export as CSV
                    </button>
                  </div>
                </div>
                
                <div className="setting-footer">
                  <button onClick={() => setShowModal(false)} className="todo-button">
                    Close
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;