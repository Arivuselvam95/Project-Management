import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesign company website',
      team: [],
      status: 'In Progress',
      tasks: [
        { id: 1, title: 'Design Homepage', completed: true },
        { id: 2, title: 'Implement Responsive Layout', completed: false },
        { id: 3, title: 'Add Analytics', completed: false }
      ],
      workspace: 'Marketing'
    },
    {
      id: 2,
      name: 'Mobile App',
      description: 'Develop mobile application',
      team: [],
      status: 'Planning',
      tasks: [
        { id: 1, title: 'Requirements Analysis', completed: true },
        { id: 2, title: 'UI/UX Design', completed: true },
        { id: 3, title: 'Backend Development', completed: false },
        { id: 4, title: 'Frontend Implementation', completed: false }
      ],
      workspace: 'Development'
    }
  ]);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '' });
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    workspace: 'Marketing',
    status: 'Planning'
  });

  const calculateProgress = (tasks) => {
    if (!tasks.length) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const handleEdit = (project) => {
    setEditingProject({ ...project });
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      ));
      setEditingProject(null);
    }
  };

  const handleAddMember = (projectId) => {
    setSelectedProject(projectId);
    setShowAddMember(true);
  };

  const handleMemberSubmit = () => {
    if (selectedProject && newMember.name && newMember.email) {
      setProjects(projects.map(p => {
        if (p.id === selectedProject) {
          return {
            ...p,
            team: [...p.team, { ...newMember, id: Date.now() }]
          };
        }
        return p;
      }));
      setNewMember({ name: '', email: '' });
      setShowAddMember(false);
    }
  };

  const handleAddTask = (projectId) => {
    setSelectedProject(projectId);
    setShowAddTask(true);
  };

  const handleTaskSubmit = () => {
    if (selectedProject && newTask.title) {
      setProjects(projects.map(p => {
        if (p.id === selectedProject) {
          return {
            ...p,
            tasks: [...p.tasks, { id: Date.now(), title: newTask.title, completed: false }]
          };
        }
        return p;
      }));
      setNewTask({ title: '' });
      setShowAddTask(false);
    }
  };

  const handleToggleTask = (projectId, taskId) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => {
            if (t.id === taskId) {
              return { ...t, completed: !t.completed };
            }
            return t;
          })
        };
      }
      return p;
    }));
  };

  const handleCreateProject = () => {
    if (newProject.name && newProject.description) {
      const project = {
        id: Date.now(),
        ...newProject,
        team: [],
        tasks: []
      };
      setProjects([...projects, project]);
      setNewProject({
        name: '',
        description: '',
        workspace: 'Marketing',
        status: 'Planning'
      });
      setShowNewProject(false);
    }
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>Projects</h2>
        <button className="add-project-btn" onClick={() => setShowNewProject(true)}>
          <i className="fas fa-plus"></i> New Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            {editingProject?.id === project.id ? (
              <div className="project-edit-form">
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={e => setEditingProject({...editingProject, name: e.target.value})}
                />
                <textarea
                  value={editingProject.description}
                  onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                />
                <select
                  value={editingProject.status}
                  onChange={e => setEditingProject({...editingProject, status: e.target.value})}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  value={editingProject.workspace}
                  onChange={e => setEditingProject({...editingProject, workspace: e.target.value})}
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                </select>
                <div className="edit-actions">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingProject(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="project-header">
                  <div className="project-title">
                    <h3>{project.name}</h3>
                    <span className="workspace-tag">{project.workspace}</span>
                  </div>
                  <div className="project-actions">
                    <button onClick={() => handleEdit(project)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleAddMember(project.id)}>
                      <i className="fas fa-user-plus"></i>
                    </button>
                    <button onClick={() => handleAddTask(project.id)}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-status">
                  Status: <span className={`status-${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
                </div>

                <div className="project-progress">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{calculateProgress(project.tasks)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${calculateProgress(project.tasks)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="project-tasks">
                  <h4>Tasks ({project.tasks.filter(t => t.completed).length}/{project.tasks.length})</h4>
                  {project.tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(project.id, task.id)}
                        />
                        <span className="checkmark"></span>
                        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="project-team">
                  <h4>Team Members</h4>
                  <div className="team-list">
                    {project.team.map(member => (
                      <div key={member.id} className="team-member">
                        <span className="member-avatar">{member.name.charAt(0)}</span>
                        <span className="member-name">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showAddMember && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Team Member</h3>
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={e => setNewMember({...newMember, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={e => setNewMember({...newMember, email: e.target.value})}
            />
            <div className="modal-actions">
              <button onClick={handleMemberSubmit}>Add</button>
              <button onClick={() => setShowAddMember(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={e => setNewTask({...newTask, title: e.target.value})}
            />
            <div className="modal-actions">
              <button onClick={handleTaskSubmit}>Add</button>
              <button onClick={() => setShowAddTask(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showNewProject && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Project</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={e => setNewProject({...newProject, name: e.target.value})}
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={e => setNewProject({...newProject, description: e.target.value})}
            />
            <select
              value={newProject.workspace}
              onChange={e => setNewProject({...newProject, workspace: e.target.value})}
            >
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
            </select>
            <select
              value={newProject.status}
              onChange={e => setNewProject({...newProject, status: e.target.value})}
            >
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleCreateProject}>Create</button>
              <button onClick={() => setShowNewProject(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
