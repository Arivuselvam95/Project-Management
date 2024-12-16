import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';
import MyTasks from './components/MyTasks/MyTasks';
import Projects from './components/Projects/Projects';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import RequireAuth from './components/Auth/RequireAuth';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <WorkspaceProvider>
          <BrowserRouter>
            <div className="app">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/*"
                  element={
                    <RequireAuth>
                      <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''} ${isMobile ? 'mobile' : ''}`}>
                        {isSidebarOpen && (
                          <Sidebar 
                            isOpen={isSidebarOpen} 
                            onClose={() => isMobile && setIsSidebarOpen(false)} 
                          />
                        )}
                        <div className="main-content">
                          <Header onMenuClick={toggleSidebar} />
                          <div className="content">
                            <Routes>
                              <Route path="/" element={<Navigate to="/dashboard" />} />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/calendar" element={<Calendar />} />
                              <Route path="/tasks" element={<MyTasks />} />
                              <Route path="/projects" element={<Projects />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/settings" element={<Settings />} />
                            </Routes>
                          </div>
                        </div>
                      </div>
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </WorkspaceProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
