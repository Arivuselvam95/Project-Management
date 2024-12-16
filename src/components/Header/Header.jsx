import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, message: 'New task assigned to you', time: '5 minutes ago', unread: true },
    { id: 2, message: 'Project deadline updated', time: '1 hour ago', unread: true },
    { id: 3, message: 'Team meeting reminder', time: '2 hours ago', unread: false }
  ];

  const getPageTitle = () => {
    const path = location.pathname.slice(1);
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateToProfile = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const navigateToSettings = () => {
    navigate('/settings');
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      
      <div className="header-actions">
        <div className="notification-wrapper">
          <button 
            className="action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <i className="fas fa-bell"></i>
            <span className="notification-badge">2</span>
          </button>
          {showNotifications && (
            <div className="dropdown notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button className="mark-all-read">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button>View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="user-menu-wrapper">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img 
              src={user?.photoURL || '/default-avatar.png'} 
              alt="Profile" 
              className="user-avatar"
            />
            <span className="user-name">{user?.displayName || 'User'}</span>
            <i className="fas fa-chevron-down"></i>
          </button>
          {showUserMenu && (
            <div className="dropdown user-dropdown">
              <div className="user-dropdown-header">
                <img 
                  src={user?.photoURL || '/default-avatar.png'} 
                  alt="Profile" 
                  className="user-avatar-large"
                />
                <div className="user-info">
                  <h4>{user?.displayName || 'User'}</h4>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={navigateToProfile}>
                <i className="fas fa-user"></i>
                Profile
              </button>
              <button className="dropdown-item" onClick={navigateToSettings}>
                <i className="fas fa-cog"></i>
                Settings
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
