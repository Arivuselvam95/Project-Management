import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../context/WorkspaceContext';
import './Sidebar.css';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({ name: '', color: 'blue' });
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(null);

  const {
    workspaces,
    selectedWorkspace,
    addWorkspace,
    updateWorkspace,
    deleteWorkspace,
    selectWorkspace
  } = useWorkspace();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname.slice(1);
    setActiveMenu(path || 'dashboard');
  }, [location]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate(`/${menu}`);
    if (isMobile) {
      onClose();
    }
  };

  const handleAddWorkspace = () => {
    if (newWorkspace.name) {
      addWorkspace(newWorkspace);
      setNewWorkspace({ name: '', color: 'blue' });
      setShowAddWorkspace(false);
    }
  };

  const handleWorkspaceClick = (workspace) => {
    selectWorkspace(workspace.id);
    // You can add additional logic here, like filtering tasks/projects by workspace
  };

  const handleDeleteWorkspace = (e, workspaceId) => {
    e.stopPropagation();
    deleteWorkspace(workspaceId);
    setShowWorkspaceMenu(null);
  };

  const handleEditWorkspace = (e, workspace) => {
    e.stopPropagation();
    setNewWorkspace({ name: workspace.name, color: workspace.color });
    setShowAddWorkspace(true);
    setShowWorkspaceMenu(null);
  };

  return (
    <>
      {isMobile && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isMobile ? 'mobile' : ''}`}>
        <div className="menu-section">
          <h3>MENU</h3>
          <button
            className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </button>
          <button
            className={`menu-item ${activeMenu === 'calendar' ? 'active' : ''}`}
            onClick={() => handleMenuClick('calendar')}
          >
            <i className="fas fa-calendar"></i>
            Calendar
          </button>
          <button
            className={`menu-item ${activeMenu === 'tasks' ? 'active' : ''}`}
            onClick={() => handleMenuClick('tasks')}
          >
            <i className="fas fa-tasks"></i>
            Tasks
          </button>
          <button
            className={`menu-item ${activeMenu === 'projects' ? 'active' : ''}`}
            onClick={() => handleMenuClick('projects')}
          >
            <i className="fas fa-project-diagram"></i>
            Projects
          </button>
        </div>

        <div className="workspace-section">
          <h3>MY WORKSPACES</h3>
          {workspaces.map(workspace => (
            <div
              key={workspace.id}
              className={`workspace-item ${workspace.selected ? 'selected' : ''}`}
              onClick={() => handleWorkspaceClick(workspace)}
            >
              <div className="workspace-info">
                <span className={`color-dot ${workspace.color}`}></span>
                <span className="workspace-name">{workspace.name}</span>
                <span className="task-count">{workspace.tasks}</span>
              </div>
              <button 
                className="workspace-menu-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWorkspaceMenu(showWorkspaceMenu === workspace.id ? null : workspace.id);
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {showWorkspaceMenu === workspace.id && (
                <div className="workspace-menu">
                  <button onClick={(e) => handleEditWorkspace(e, workspace)}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button onClick={(e) => handleDeleteWorkspace(e, workspace.id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <button className="add-workspace-btn" onClick={() => setShowAddWorkspace(true)}>
            <i className="fas fa-plus"></i>
            Add Workspace
          </button>
        </div>

        {showAddWorkspace && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Workspace</h3>
              <input
                type="text"
                placeholder="Workspace Name"
                value={newWorkspace.name}
                onChange={e => setNewWorkspace({...newWorkspace, name: e.target.value})}
              />
              <select
                value={newWorkspace.color}
                onChange={e => setNewWorkspace({...newWorkspace, color: e.target.value})}
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
              </select>
              <div className="modal-actions">
                <button onClick={handleAddWorkspace}>Add</button>
                <button onClick={() => setShowAddWorkspace(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
