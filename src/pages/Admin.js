import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI } from '../api/axios';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, prepend the server URL
  return `http://localhost:5000${imagePath}`;
};

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      navigate('/home');
      return;
    }

    loadDashboardData();
  }, [isAuthenticated, user, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load stats
      const statsResponse = await adminAPI.getStats();
      setStats(statsResponse.data.stats);

      // Load users
      const usersResponse = await adminAPI.getUsers();
      setUsers(usersResponse.data.users);

      // Load posts
      const postsResponse = await adminAPI.getPosts();
      setPosts(postsResponse.data.posts);

    } catch (error) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await adminAPI.updateUserStatus(userId, newStatus);
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
      
      setSuccessMessage(`User ${newStatus} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      setError('Failed to update user status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handlePostStatusToggle = async (postId, currentStatus) => {
    try {
      if (currentStatus === 'active') {
        await adminAPI.removePost(postId);
      } else {
        await adminAPI.restorePost(postId);
      }
      
      // Update local state
      setPosts(prev => prev.map(post => 
        post._id === postId ? { ...post, status: currentStatus === 'active' ? 'removed' : 'active' } : post
      ));
      
      setSuccessMessage(`Post ${currentStatus === 'active' ? 'removed' : 'restored'} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      setError('Failed to update post status');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="page-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage users and content for EcoVoice platform</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        <section className="section">
          <div className="container">
            {/* Tab Navigation */}
            <div className="admin-tabs">
              <button
                className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                📊 Dashboard
              </button>
              <button
                className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                👥 Users
              </button>
              <button
                className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                📝 Posts
              </button>
            </div>

            {successMessage && (
              <div className="form-status success">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="form-status error">
                {error}
              </div>
            )}

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && stats && (
              <div className="admin-dashboard">
                <h2>Platform Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <h3>{stats.users.total}</h3>
                      <p>Total Users</p>
                      <div className="stat-breakdown">
                        <span className="active">Active: {stats.users.active}</span>
                        <span className="inactive">Inactive: {stats.users.inactive}</span>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-content">
                      <h3>{stats.posts.total}</h3>
                      <p>Total Posts</p>
                      <div className="stat-breakdown">
                        <span className="active">Active: {stats.posts.active}</span>
                        <span className="inactive">Removed: {stats.posts.removed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="admin-users">
                <h2>User Management</h2>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(userItem => (
                        <tr key={userItem._id}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                {userItem.profilePic ? (
                                  <img src={getImageUrl(userItem.profilePic)} alt={userItem.name} />
                                ) : (
                                  <span>👤</span>
                                )}
                              </div>
                              <div>
                                <div className="user-name">{userItem.name}</div>
                                <div className="user-username">@{userItem.username}</div>
                              </div>
                            </div>
                          </td>
                          <td>{userItem.email}</td>
                          <td>
                            <span className={`role-badge ${userItem.role}`}>
                              {userItem.role}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${userItem.status}`}>
                              {userItem.status}
                            </span>
                          </td>
                          <td>{new Date(userItem.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className={`btn ${userItem.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                              onClick={() => handleUserStatusToggle(userItem._id, userItem.status)}
                              disabled={userItem._id === user._id} // Prevent self-deactivation
                            >
                              {userItem.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="admin-posts">
                <h2>Content Management</h2>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Post</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map(post => (
                        <tr key={post._id}>
                          <td>
                            <div className="post-info">
                              <h4>{post.title}</h4>
                              <p>{post.content.substring(0, 100)}...</p>
                            </div>
                          </td>
                          <td>
                            <div className="author-info">
                              <span>{post.author?.name || 'Unknown'}</span>
                            </div>
                          </td>
                          <td>
                            <span className="category-badge">
                              {post.category}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${post.status}`}>
                              {post.status}
                            </span>
                          </td>
                          <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className={`btn ${post.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                              onClick={() => handlePostStatusToggle(post._id, post.status)}
                            >
                              {post.status === 'active' ? 'Remove' : 'Restore'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
