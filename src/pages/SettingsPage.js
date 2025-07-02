import React from 'react';
import { Link } from 'react-router-dom';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import FunctionalitySettings from '../components/settings/FunctionalitySettings';
import ExportSettings from '../components/settings/ExportSettings';
import ImportSettings from '../components/settings/ImportSettings';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/pages/SettingsPage.css'; 


function SettingsPage({ 
  darkMode, setDarkMode, 
  todos, categories, stats, 
  setTodos, setCategories,
  autoArchiveCompleted, setAutoArchiveCompleted
}) {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Tasks
        </Link>
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        <AppearanceSettings 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        
        <FunctionalitySettings
          autoArchiveCompleted={autoArchiveCompleted}
          setAutoArchiveCompleted={setAutoArchiveCompleted}
        />
        
        <ImportSettings 
          todos={todos}
          categories={categories}
          setTodos={setTodos}
          setCategories={setCategories}
        />
        
        <ExportSettings 
          todos={todos} 
          categories={categories} 
          stats={stats} 
        />
      </div>
    </div>
  );
}

export default SettingsPage;