import React, { useState, useRef } from 'react';
import { FaFileImport, FaCheck, FaTimes } from 'react-icons/fa';
import '../../styles/Settings.css';

function ImportSettings({ setTodos, setCategories, todos, categories }) {
  const [importStatus, setImportStatus] = useState(null);
  const [importMode, setImportMode] = useState('merge');
  const fileInputRef = useRef(null);
  
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setImportStatus({
      status: 'processing',
      message: 'Processing file...'
    });
    
    const reader = new FileReader();
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    reader.onload = (e) => {
      try {
        // Determine if it's JSON or CSV by checking file extension
        if (fileExtension === 'json') {
          handleJsonImport(e.target.result);
        } else if (fileExtension === 'csv') {
          handleCsvImport(e.target.result);
        } else {
          setImportStatus({
            status: 'error',
            message: 'Unsupported file format. Please use JSON or CSV files.'
          });
        }
      } catch (error) {
        setImportStatus({
          status: 'error',
          message: `Error processing file: ${error.message}`
        });
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.onerror = () => {
      setImportStatus({
        status: 'error',
        message: 'Error reading file.'
      });
    };
    
    if (fileExtension === 'json' || fileExtension === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };
  
  const handleJsonImport = (content) => {
    try {
      const importedData = JSON.parse(content);
      
      // Validate the data structure
      if (!importedData.todos || !Array.isArray(importedData.todos)) {
        throw new Error('Invalid JSON format: missing todos array');
      }
      
      // Import the data based on the selected mode
      if (importMode === 'replace') {
        setTodos(importedData.todos);
        
        if (importedData.categories && Array.isArray(importedData.categories)) {
          setCategories(importedData.categories);
        }
        
        setImportStatus({
          status: 'success',
          message: `Successfully replaced data with ${importedData.todos.length} tasks and ${
            importedData.categories ? importedData.categories.length : 0
          } categories.`
        });
      } else { // Merge mode
        // Merge todos by checking for duplicates by id
        const existingIds = new Set(todos.map(todo => todo.id));
        const newTodos = [...todos];
        
        importedData.todos.forEach(todo => {
          if (!existingIds.has(todo.id)) {
            newTodos.push(todo);
            existingIds.add(todo.id);
          }
        });
        
        setTodos(newTodos);
        
        // Merge categories by checking for duplicates by id
        if (importedData.categories && Array.isArray(importedData.categories)) {
          const existingCategoryIds = new Set(categories.map(cat => cat.id));
          const newCategories = [...categories];
          
          importedData.categories.forEach(category => {
            if (!existingCategoryIds.has(category.id)) {
              newCategories.push(category);
              existingCategoryIds.add(category.id);
            }
          });
          
          setCategories(newCategories);
        }
        
        setImportStatus({
          status: 'success',
          message: `Successfully merged in ${
            newTodos.length - todos.length
          } new tasks and ${
            importedData.categories && Array.isArray(importedData.categories)
              ? importedData.categories.length - categories.length
              : 0
          } new categories.`
        });
      }
    } catch (error) {
      setImportStatus({
        status: 'error',
        message: `Error importing JSON: ${error.message}`
      });
    }
  };
  
  const handleCsvImport = (content) => {
    try {
      // Basic CSV parsing
      const lines = content.split('\n');
      if (lines.length < 2) {
        throw new Error('CSV file has insufficient data');
      }
      
      const headers = lines[0].split(',');
      const requiredColumns = ['ID', 'Text', 'Status', 'Priority'];
      
      // Check if all required columns exist
      for (const col of requiredColumns) {
        if (!headers.includes(col)) {
          throw new Error(`CSV is missing required column: ${col}`);
        }
      }
      
      // Parse rows into todos
      const importedTodos = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Handle quoted fields with commas
        const row = parseCsvRow(lines[i]);
        
        if (row.length !== headers.length) {
          console.warn(`Skipping row ${i}, invalid column count`);
          continue;
        }
        
        // Map columns to their values
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        
        const newTodo = {
          id: parseInt(rowData.ID, 10) || Math.floor(Math.random() * 10000),
          text: rowData.Text || 'Imported Task',
          isComplete: rowData.Status === 'Completed',
          isArchived: rowData.Status === 'Archived',
          priority: rowData.Priority || 'medium',
          dateCreated: rowData['Created Date'] || new Date().toISOString(),
          dateUpdated: rowData['Updated Date'] || new Date().toISOString(),
          completedAt: rowData['Completed Date'] || null,
          archivedAt: rowData['Archived Date'] || null
        };
        
        // Try to match with a category if provided
        if (rowData.Category && rowData.Category !== 'None') {
          const matchingCategory = categories.find(cat => cat.name === rowData.Category);
          if (matchingCategory) {
            newTodo.categoryId = matchingCategory.id;
          }
        }
        
        importedTodos.push(newTodo);
      }
      
      // Apply the imported todos based on the selected mode
      if (importMode === 'replace') {
        setTodos(importedTodos);
        setImportStatus({
          status: 'success',
          message: `Successfully replaced data with ${importedTodos.length} tasks.`
        });
      } else { // Merge mode
        // Merge todos by checking for duplicates by id
        const existingIds = new Set(todos.map(todo => todo.id));
        const newTodos = [...todos];
        let addedCount = 0;
        
        importedTodos.forEach(todo => {
          if (!existingIds.has(todo.id)) {
            newTodos.push(todo);
            existingIds.add(todo.id);
            addedCount++;
          }
        });
        
        setTodos(newTodos);
        
        setImportStatus({
          status: 'success',
          message: `Successfully merged in ${addedCount} new tasks.`
        });
      }
    } catch (error) {
      setImportStatus({
        status: 'error',
        message: `Error importing CSV: ${error.message}`
      });
    }
  };
  
  // Helper function to parse CSV rows properly handling quoted fields
  const parseCsvRow = (row) => {
    const result = [];
    let inQuotes = false;
    let currentValue = "";
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        if (i + 1 < row.length && row[i + 1] === '"') {
          // Handle escaped quotes (two quotes in a row)
          currentValue += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(currentValue);
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    
    // Don't forget the last field
    result.push(currentValue);
    return result;
  };
  
  const clearImportStatus = () => {
    setImportStatus(null);
  };
  
  return (
    <div className="setting-section">
      <h3>Import Data</h3>
      <p className="setting-description">
        Import tasks and categories from a previously exported file. 
        <br />Supported formats: JSON and CSV.
      </p>
      
      <div className="import-options">
        <div className="setting-item">
          <label>
            <input 
              type="radio" 
              name="importMode" 
              value="merge" 
              checked={importMode === 'merge'} 
              onChange={() => setImportMode('merge')} 
            />
            Merge with existing data (keeps your current tasks)
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input 
              type="radio" 
              name="importMode" 
              value="replace" 
              checked={importMode === 'replace'} 
              onChange={() => setImportMode('replace')} 
            />
            Replace existing data (warning: this will remove all current tasks)
          </label>
        </div>
      </div>
      
      <div className="file-input-container">
        <input
          type="file"
          accept=".json,.csv"
          onChange={handleImport}
          ref={fileInputRef}
          className="file-input"
          id="import-file"
        />
        <label htmlFor="import-file" className="file-input-label">
          <FaFileImport /> Choose File to Import
        </label>
      </div>
      
      {importStatus && (
        <div className={`import-status import-${importStatus.status}`}>
          {importStatus.status === 'success' ? (
            <FaCheck className="status-icon success-icon" />
          ) : importStatus.status === 'error' ? (
            <FaTimes className="status-icon error-icon" />
          ) : null}
          <span>{importStatus.message}</span>
          <button className="status-close" onClick={clearImportStatus}>×</button>
        </div>
      )}
    </div>
  );
}

export default ImportSettings;