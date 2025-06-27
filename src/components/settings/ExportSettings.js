import React from 'react';
import { FaFileExport } from 'react-icons/fa';
import '../../styles/Settings.css';

function ExportSettings({ todos, categories, stats }) {
  const exportData = (format) => {
    // Get current date and time formatted as YYYY-MM-DD__HH-MM
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const dateString = `${year}-${month}-${day}__${hours}-${minutes}`;
    
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
      exportDate: now.toISOString()
    };
    
    let fileContent;
    let fileType;
    let fileName;
    
    // Format based on selected format
    if (format === 'json') {
      fileContent = JSON.stringify(dataToExport, null, 2);
      fileType = 'application/json';
      fileName = `task-manager-export_${dateString}.json`;
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
      fileName = `task-manager-export_${dateString}.csv`;
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
    <div className="setting-section">
      <h3>Export Data</h3>
      <p className="setting-description">
        Export your tasks, categories, and statistics to a file. 
        You can import this file later to restore your data.
      </p>
      <div className="export-buttons">
        <button 
          className="export-button json-export" 
          onClick={() => exportData('json')}
          title="Export as JSON file"
        >
          <FaFileExport /> Export as JSON
        </button>
        <button 
          className="export-button csv-export" 
          onClick={() => exportData('csv')}
          title="Export as CSV file"
        >
          <FaFileExport /> Export as CSV
        </button>
      </div>
    </div>
  );
}

export default ExportSettings;