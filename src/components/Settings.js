import React from 'react';
import AppearanceSettings from './settings/AppearanceSettings';
import ExportSettings from './settings/ExportSettings';
import ImportSettings from './settings/ImportSettings';
import FunctionalitySettings from './settings/FunctionalitySettings';
import '../styles/Settings.css';


function Settings({ darkMode, setDarkMode, 
  todos, categories, stats, 
  setTodos, setCategories,
  autoArchiveCompleted, setAutoArchiveCompleted }) {
    return (
        <div className="settings-panel">
            <h2>Settings</h2>
            
            <AppearanceSettings 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
            />

            <FunctionalitySettings
                autoArchiveCompleted={autoArchiveCompleted}
                setAutoArchiveCompleted={setAutoArchiveCompleted}
            />
            
            <ExportSettings 
                todos={todos} 
                categories={categories} 
                stats={stats} 
            />

            <ImportSettings 
                todos={todos}
                categories={categories}
                setTodos={setTodos}
                setCategories={setCategories}
            />
        
            <div className="setting-footer">
                <button onClick={onClose} className="todo-button">
                Close
                </button>
            </div>
        </div>
    );
}

export default Settings;