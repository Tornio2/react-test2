import React from 'react';
import '../../styles/Settings.css';

function FunctionalitySettings({ autoArchiveCompleted, setAutoArchiveCompleted }) {
  return (
    <div className="setting-section">
      <h3>Functionality</h3>
      <div className="setting-description">
        Configure how the app manages your tasks automatically.
      </div>
      
      <div className="setting-item">
        <label className="setting-checkbox-label">
          <input 
            type="checkbox" 
            checked={autoArchiveCompleted} 
            onChange={() => setAutoArchiveCompleted(!autoArchiveCompleted)} 
            className="setting-checkbox"
          />
          <span className="setting-label-text">
            Automatically archive completed tasks
          </span>
        </label>
        <p className="setting-help-text">
          When enabled, tasks will be automatically moved to the archive when marked as complete
        </p>
      </div>
    </div>
  );
}

export default FunctionalitySettings;