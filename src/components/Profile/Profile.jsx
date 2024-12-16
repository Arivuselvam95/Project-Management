import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // In a real application, you would make an API call here
      // For demo purposes, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));

      updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        {!editing && (
          <button 
            className="edit-profile-btn"
            onClick={() => setEditing(true)}
          >
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        )}
      </div>

      {error && <div className="profile-error">{error}</div>}
      {success && <div className="profile-success">{success}</div>}

      <div className="profile-content">
        <div className="profile-avatar">
          <img src={formData.avatar || 'https://via.placeholder.com/150'} alt="Profile" />
          {editing && (
            <div className="avatar-upload">
              <label htmlFor="avatar">
                <i className="fas fa-camera"></i>
                Change Photo
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        <div className="profile-details">
          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      avatar: user?.avatar || ''
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>

              <div className="info-group">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>

              <div className="info-group">
                <label>Account Type</label>
                <p className="capitalize">{user?.role || 'User'}</p>
              </div>

              <div className="info-group">
                <label>Member Since</label>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-footer">
        <button className="logout-btn" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
