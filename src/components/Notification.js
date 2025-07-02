import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/Notification.css'

function Notification({ message, isVisible, onHide, type = 'success' }) {

    // TYPES:
    // Success
    // Error
    // Warning

    const getNotificationIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="notification-icon" />;
      case 'error':
        return <FaTimes className="notification-icon" />;
      case 'warning':
        return <FaExclamationTriangle className="notification-icon" />;
      default:
        return <FaCheckCircle className="notification-icon" />;
    }
  };


  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 1500); // hide after 1.5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div className={`notification ${type} ${isVisible ? 'show' : ''}`}>
      {getNotificationIcon()}
      <span className="notification-message">{message}</span>
    </div>
  );
}

export default Notification;