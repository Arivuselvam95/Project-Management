import React, { createContext, useContext, useState } from 'react';

const WorkspaceContext = createContext();

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: 'Marketing', color: 'blue', tasks: 5, selected: false },
    { id: 2, name: 'Design', color: 'green', tasks: 3, selected: false },
    { id: 3, name: 'Development', color: 'orange', tasks: 8, selected: false }
  ]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const addWorkspace = (workspace) => {
    const newWorkspace = {
      id: Date.now(),
      ...workspace,
      tasks: 0,
      selected: false
    };
    setWorkspaces([...workspaces, newWorkspace]);
  };

  const updateWorkspace = (id, updates) => {
    setWorkspaces(workspaces.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

  const deleteWorkspace = (id) => {
    setWorkspaces(workspaces.filter(w => w.id !== id));
    if (selectedWorkspace === id) {
      setSelectedWorkspace(null);
    }
  };

  const selectWorkspace = (id) => {
    setSelectedWorkspace(id);
    setWorkspaces(workspaces.map(w => ({
      ...w,
      selected: w.id === id
    })));
  };

  const updateTaskCount = (workspaceId, count) => {
    setWorkspaces(workspaces.map(w =>
      w.id === workspaceId ? { ...w, tasks: count } : w
    ));
  };

  return (
    <WorkspaceContext.Provider value={{
      workspaces,
      selectedWorkspace,
      addWorkspace,
      updateWorkspace,
      deleteWorkspace,
      selectWorkspace,
      updateTaskCount
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
