import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../styles/CategoryManager.css'

function CategoryManager({ categories, addCategory, removeCategory, onClose }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory({ name, color });
    setName('');
    setColor('#3b82f6');
  };

  return (
    <div className="category-manager">
      <h2>Manage Categories</h2>
      
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="todo-input"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '50px', height: '45px', padding: '0' }}
        />
        <button type="submit" className="todo-button">
          <FaPlus style={{ marginRight: '5px' }} /> Add
        </button>
      </form>
      
      <div className="category-list">
        {categories.map(category => (
          <div key={category.id} className="category-item">
            <div className="category-name-display">
              <div 
                className="category-color" 
                style={{ backgroundColor: category.color }}
              ></div>
              {category.name}
            </div>
            <button
              onClick={() => removeCategory(category.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button onClick={onClose} className="todo-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default CategoryManager;