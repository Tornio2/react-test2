import React from 'react';
import AppearanceSettings from './settings/AppearanceSettings';
import ExportSettings from './settings/ExportSettings';
import '../styles/AppearanceSettings.css';


function Settings({ darkMode, setDarkMode, todos, categories, stats, onClose }) {
  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      
      <AppearanceSettings 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      
      <ExportSettings 
        todos={todos} 
        categories={categories} 
        stats={stats} 
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