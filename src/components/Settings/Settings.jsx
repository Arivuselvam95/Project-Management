import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Settings.css';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notification, setNotification] = useState({
    email: true,
    push: true,
    taskReminders: true
  });

  const handleNotificationChange = (type) => {
    setNotification(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h4>Dark Mode</h4>
            <p>Toggle dark mode for a better viewing experience in low light</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h4>Email Notifications</h4>
            <p>Receive updates and reminders via email</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input
                type="checkbox"
                checked={notification.email}
                onChange={() => handleNotificationChange('email')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Push Notifications</h4>
            <p>Get instant notifications in your browser</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input
                type="checkbox"
                checked={notification.push}
                onChange={() => handleNotificationChange('push')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Task Reminders</h4>
            <p>Get reminders for upcoming and overdue tasks</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input
                type="checkbox"
                checked={notification.taskReminders}
                onChange={() => handleNotificationChange('taskReminders')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Account Settings</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>
          <button className="btn-secondary">Change Email</button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Password</h4>
            <p>Last changed 30 days ago</p>
          </div>
          <button className="btn-secondary">Change Password</button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Privacy</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h4>Activity Status</h4>
            <p>Show when you're active in the workspace</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={true}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
