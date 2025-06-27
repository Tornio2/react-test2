import React, { useState } from 'react';
import { FaChartPie, FaChevronDown, FaChevronUp, FaArchive } from 'react-icons/fa';
import '../styles/StatsPanel.css'; 

function StatsPanel({ stats }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="stats-panel">
      <div 
        className="stats-header" 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <h3>
          <FaChartPie style={{ marginRight: '8px' }} />
          Task Statistics
        </h3>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      
      {isExpanded && (
        <>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            
            <div className="stat-box">
              <div className="stat-number">{stats.active}</div>
              <div className="stat-label">Active Tasks</div>
            </div>
            
            <div className="stat-box">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed Tasks</div>
            </div>
            
            <div className="stat-box archived">
              <div className="stat-number">
                {/* <FaArchive style={{ marginRight: '5px' }} /> */}
                {stats.archived}
              </div>
              <div className="stat-label">Archived Tasks</div>
            </div>
          </div>
          
          {stats.categories.length > 0 && (
            <>
              <h4 className = "category-stats-header">
                Tasks by Category
              </h4>
              <div className="category-stats">
                {stats.categories.map(category => (
                  <div key={category.id} className="stat-box">
                    <div className="stat-number">
                      <span 
                        style={{ 
                          display: 'inline-block', 
                          width: '8px', 
                          height: '8px', 
                          backgroundColor: category.color,
                          borderRadius: '50%',
                          marginRight: '5px'
                        }} 
                      ></span>
                      {category.count}
                    </div>
                    <div className="stat-label">{category.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default StatsPanel;