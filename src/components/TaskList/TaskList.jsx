import React, { useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Review',
      time: '9:00 AM - 10:00 AM',
      category: 'Marketing',
      status: 'In Progress',
      priority: 'high',
      description: 'Review new website design with the team'
    },
    {
      id: 2,
      title: 'Team Meeting',
      time: '10:30 AM - 11:30 AM',
      category: 'Development',
      status: 'Todo',
      priority: 'medium',
      description: 'Weekly team sync-up'
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '2:00 PM - 3:00 PM',
      category: 'Design',
      status: 'Todo',
      priority: 'low',
      description: 'Present new feature designs to the client'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
    category: 'Marketing',
    priority: 'medium',
    description: ''
  });
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('time');

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'Todo'
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      time: '',
      category: 'Marketing',
      priority: 'medium',
      description: ''
    });
    setShowAddTask(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks
    .filter(task => filter === 'all' ? true : task.status.toLowerCase() === filter)
    .sort((a, b) => {
      if (sort === 'time') {
        return a.time.localeCompare(b.time);
      } else if (sort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Today's Tasks</h2>
        <div className="task-controls">
          <div className="filter-sort">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tasks</option>
              <option value="todo">Todo</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              <option value="time">Sort by Time</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
          <button className="add-task-btn" onClick={() => setShowAddTask(true)}>
            <i className="fas fa-plus"></i> Add Task
          </button>
        </div>
      </div>

      <div className="tasks-container">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-card priority-${task.priority}`}>
            <div className="task-header">
              <div className="task-time">{task.time}</div>
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`status-select status-${task.status.toLowerCase().replace(' ', '-')}`}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <div className="task-details">
              <span className="task-category">{task.category}</span>
              <span className={`task-priority priority-${task.priority}`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddTask && (
        <div className="task-modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <button className="close-btn" onClick={() => setShowAddTask(false)}>
              <i className="fas fa-times"></i>
            </button>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="text"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  placeholder="e.g., 9:00 AM - 10:00 AM"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddTask(false)}>Cancel</button>
                <button type="submit">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
