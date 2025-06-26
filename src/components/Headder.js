import React from 'react';
import { FaTasks } from 'react-icons/fa';

function Header() {
  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <>
      <h1>
        <FaTasks style={{ marginRight: '10px' }} />
        Task Manager Pro
      </h1>
      <div className="date-display">
        {formatDate()}
      </div>
    </>
  );
}

export default Header;