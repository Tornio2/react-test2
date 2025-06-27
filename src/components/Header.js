import React from 'react';
import '../styles/Header.css'; 
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
      <h1 className="header-title">To-do Application (find a name)</h1>
      <div className="date-display">
        {formatDate()}
      </div>
    </>
  );
}

export default Header;