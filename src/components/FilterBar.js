import React from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown, FaFilter, FaArchive } from 'react-icons/fa';
import '../styles/FilterBar.css'; 

function FilterBar({ filter, setFilter, sortMethod, setSortMethod, categories }) {
  const handleStatusFilter = (status) => {
    setFilter({ ...filter, status });
  };

  const handlePriorityFilter = (priority) => {
    setFilter({ ...filter, priority });
  };

  const handleCategoryFilter = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleSearch = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleSort = (sort) => {
    setSortMethod(sort);
  };

  const handleArchivedFilter = (archived) => {
    setFilter({ ...filter, archived });
  };

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="search-container" style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <select
          className="form-control"
          value={filter.category}
          onChange={handleCategoryFilter}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-row">
        <div>
          <FaFilter style={{ marginRight: '5px', color: 'var(--text-secondary)', fontSize: '12px' }} />
          <button 
            className={`filter-button ${filter.status === 'all' ? 'active' : ''}`} 
            onClick={() => handleStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter.status === 'active' ? 'active' : ''}`} 
            onClick={() => handleStatusFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-button ${filter.status === 'completed' ? 'active' : ''}`} 
            onClick={() => handleStatusFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div>
          <FaArchive style={{ marginRight: '5px', color: 'var(--text-secondary)', fontSize: '12px' }} />
          <button 
            className={`filter-button ${filter.archived === 'active' ? 'active' : ''}`} 
            onClick={() => handleArchivedFilter('active')}
          >
            Current
          </button>
          <button 
            className={`filter-button ${filter.archived === 'archived' ? 'active' : ''}`} 
            onClick={() => handleArchivedFilter('archived')}
          >
            Archived
          </button>
          <button 
            className={`filter-button ${filter.archived === 'all' ? 'active' : ''}`} 
            onClick={() => handleArchivedFilter('all')}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="filter-row">
        <div>
          <button 
            className={`filter-button ${filter.priority === 'all' ? 'active' : ''}`} 
            onClick={() => handlePriorityFilter('all')}
          >
            All Priorities
          </button>
          <button 
            className={`filter-button ${filter.priority === 'high' ? 'active' : ''}`} 
            onClick={() => handlePriorityFilter('high')}
          >
            High
          </button>
          <button 
            className={`filter-button ${filter.priority === 'medium' ? 'active' : ''}`} 
            onClick={() => handlePriorityFilter('medium')}
          >
            Medium
          </button>
          <button 
            className={`filter-button ${filter.priority === 'low' ? 'active' : ''}`} 
            onClick={() => handlePriorityFilter('low')}
          >
            Low
          </button>
        </div>
        
        <div>
          <button 
            className={`filter-button ${sortMethod === 'date-desc' ? 'active' : ''}`} 
            onClick={() => handleSort('date-desc')}
            title="Newest First"
          >
            <FaSortAmountDown />
          </button>
          <button 
            className={`filter-button ${sortMethod === 'date-asc' ? 'active' : ''}`} 
            onClick={() => handleSort('date-asc')}
            title="Oldest First"
          >
            <FaSortAmountUp />
          </button>
          <button 
            className={`filter-button ${sortMethod === 'alphabetical' ? 'active' : ''}`} 
            onClick={() => handleSort('alphabetical')}
            title="Alphabetical"
          >
            <FaSortAlphaDown />
          </button>
          <button 
            className={`filter-button ${sortMethod === 'priority-high' ? 'active' : ''}`} 
            onClick={() => handleSort('priority-high')}
            title="Priority (High to Low)"
          >
            Priority ↓
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;