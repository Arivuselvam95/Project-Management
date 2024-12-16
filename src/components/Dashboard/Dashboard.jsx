import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { id: 1, label: 'Total Tasks', value: 12, icon: 'fas fa-tasks', color: 'blue' },
    { id: 2, label: 'In Progress', value: 5, icon: 'fas fa-spinner', color: 'orange' },
    { id: 3, label: 'Completed', value: 7, icon: 'fas fa-check-circle', color: 'green' },
    { id: 4, label: 'Projects', value: 3, icon: 'fas fa-project-diagram', color: 'purple' }
  ];

  const recentActivities = [
    { id: 1, type: 'task', action: 'completed', item: 'Website Design Review', time: '2 hours ago' },
    { id: 2, type: 'project', action: 'created', item: 'Mobile App Development', time: '4 hours ago' },
    { id: 3, type: 'task', action: 'updated', item: 'Database Schema Design', time: '6 hours ago' }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Client Meeting', date: '2024-12-17', priority: 'high' },
    { id: 2, title: 'Project Presentation', date: '2024-12-18', priority: 'medium' },
    { id: 3, title: 'Code Review', date: '2024-12-19', priority: 'low' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <i className={activity.type === 'task' ? 'fas fa-tasks' : 'fas fa-project-diagram'}></i>
                </div>
                <div className="activity-details">
                  <p>
                    <span className="activity-action">{activity.action}</span>
                    {' '}{activity.item}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Upcoming Tasks</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="upcoming-tasks">
            {upcomingTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <p>Due: {new Date(task.date).toLocaleDateString()}</p>
                </div>
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
