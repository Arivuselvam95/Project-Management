import React, { useState } from 'react';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Create a modern and responsive homepage design',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-12-20',
      assignee: 'John Doe'
    },
    {
      id: 2,
      title: 'Implement Authentication',
      description: 'Add user authentication and authorization',
      status: 'Todo',
      priority: 'High',
      dueDate: '2024-12-25',
      assignee: 'Jane Smith'
    },
    {
      id: 3,
      title: 'Database Setup',
      description: 'Set up and configure the database',
      status: 'Completed',
      priority: 'Medium',
      dueDate: '2024-12-15',
      assignee: 'Mike Johnson'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-in-progress';
      default:
        return 'status-todo';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>My Tasks</h2>
        <div className="tasks-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
            onClick={() => setFilter('todo')}
          >
            Todo
          </button>
          <button
            className={`filter-btn ${filter === 'in progress' ? 'active' : ''}`}
            onClick={() => setFilter('in progress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`status-badge ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
              <div className={`priority-tag ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </div>
              <div className="due-date">
                <i className="far fa-calendar"></i>
                {task.dueDate}
              </div>
              <div className="assignee">
                <i className="far fa-user"></i>
                {task.assignee}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="add-task-btn">
        <i className="fas fa-plus"></i>
        Add New Task
      </button>
    </div>
  );
};

export default Tasks;
