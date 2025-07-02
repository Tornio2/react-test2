import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/Notification.css'

function Notification({ message, isVisible, onHide, type = 'success' }) {

    // TYPES:
    // Success
    // Error
    // Warning



  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 1500); // Hide after 1 second
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div className={`notification ${type} ${isVisible ? 'show' : ''}`}>
      <FaCheckCircle className="notification-icon" />
      <span className="notification-message">{message}</span>
    </div>
  );
}

export default Notification;