import React, { useState } from 'react';
import './MyTasks.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design new landing page',
      description: 'Create a modern and responsive landing page design',
      dueDate: '2024-12-20',
      priority: 'high',
      status: 'in-progress',
      project: 'Website Redesign',
      assignee: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/32'
      }
    },
    // Add more sample tasks
  ]);

  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    project: 'all'
  });

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    project: '',
    status: 'todo'
  });

  const priorities = ['low', 'medium', 'high'];
  const statuses = ['todo', 'in-progress', 'completed'];
  const projects = ['Website Redesign', 'Mobile App', 'Marketing Campaign'];

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      assignee: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/32'
      }
    };
    setTasks([...tasks, task]);
    setShowNewTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      project: '',
      status: 'todo'
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    return (filter.status === 'all' || task.status === filter.status) &&
           (filter.priority === 'all' || task.priority === filter.priority) &&
           (filter.project === 'all' || task.project === filter.project);
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'todo': return 'status-todo';
      default: return '';
    }
  };

  return (
    <div className="mytasks-container">
      <div className="mytasks-header">
        <h2>My Tasks</h2>
        <button 
          className="new-task-btn"
          onClick={() => setShowNewTaskModal(true)}
        >
          <i className="fas fa-plus"></i> New Task
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Priority</label>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="all">All</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Project</label>
          <select
            value={filter.project}
            onChange={(e) => setFilter({ ...filter, project: e.target.value })}
          >
            <option value="all">All</option>
            {projects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-badges">
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className="project-badge">{task.project}</span>
              </div>
            </div>

            <p className="task-description">{task.description}</p>

            <div className="task-details">
              <div className="task-assignee">
                <img src={task.assignee.avatar} alt={task.assignee.name} />
                <span>{task.assignee.name}</span>
              </div>
              <div className="task-due-date">
                <i className="far fa-calendar"></i>
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>

            <div className="task-status">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className={getStatusColor(task.status)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {showNewTaskModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Task</h3>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({
                    ...newTask,
                    title: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({
                    ...newTask,
                    description: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({
                    ...newTask,
                    dueDate: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({
                    ...newTask,
                    priority: e.target.value
                  })}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Project</label>
                <select
                  value={newTask.project}
                  onChange={(e) => setNewTask({
                    ...newTask,
                    project: e.target.value
                  })}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowNewTaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
