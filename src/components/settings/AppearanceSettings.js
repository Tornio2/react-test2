import React from 'react';
import '../../styles/Settings.css';

function AppearanceSettings({ darkMode, setDarkMode }) {
  return (
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
  );
}

export default AppearanceSettings;