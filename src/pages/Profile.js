import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api/axios';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, prepend the server URL
  return `http://localhost:5000${imagePath}`;
};

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    interestLevel: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        interestLevel: user.interestLevel || ''
      });
      setPreviewUrl(user.profilePic ? getImageUrl(user.profilePic) : '');
    }
  }, [user, isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ profilePic: 'Please select an image file' });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ profilePic: 'Image size must be less than 5MB' });
        return;
      }

      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profilePic: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Validate form
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Update profile info
      const result = await updateProfile({
        name: formData.name,
        bio: formData.bio,
        interestLevel: formData.interestLevel
      });

      if (!result.success) {
        setErrors({ general: result.error });
        return;
      }

      // Upload profile picture if selected
      if (profilePic) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', profilePic);

        const uploadResult = await authAPI.uploadProfilePicture(formDataUpload);
        
        if (!uploadResult.data.success) {
          setErrors({ profilePic: 'Failed to upload profile picture' });
          return;
        }

        // Update the user state with new profile picture
        const updatedUser = { ...user, profilePic: uploadResult.data.profilePic };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Trigger a re-render by updating the auth context
        // This will be handled by the next getProfile call
      }

      setSuccessMessage('Profile updated successfully!');
      setProfilePic(null);
      
      // Refresh user data to get updated profile
      try {
        const profileResponse = await authAPI.getProfile();
        const updatedUser = profileResponse.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Force a page re-render to show updated data
        window.location.reload();
      } catch (refreshError) {
        console.error('Failed to refresh user data:', refreshError);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      setErrors({ general: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const interestLevels = [
    { value: 'beginner', label: 'Beginner - Just starting to learn about environmental issues' },
    { value: 'intermediate', label: 'Intermediate - Some knowledge and eco-friendly practices' },
    { value: 'expert', label: 'Expert - Actively involved in environmental advocacy' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="page-header">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        <section className="section section-light">
          <div className="container">
            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-avatar">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile" className="profile-image" />
                  ) : user?.profilePic ? (
                    <>
                      <img src={getImageUrl(user.profilePic)} alt="Profile" className="profile-image" />
                      <small style={{ display: 'block', marginTop: '5px', fontSize: '10px', color: '#666' }}>
                        Debug: {user.profilePic} → {getImageUrl(user.profilePic)}
                      </small>
                    </>
                  ) : (
                    <div className="profile-placeholder">
                      <span className="profile-icon">👤</span>
                    </div>
                  )}
                </div>
                <div className="profile-info">
                  <h2>{user?.name || 'User'}</h2>
                  <p className="profile-username">@{user?.username}</p>
                  <p className="profile-role">{user?.role === 'admin' ? 'Administrator' : 'Member'}</p>
                </div>
              </div>

              {successMessage && (
                <div className="form-status success">
                  {successMessage}
                </div>
              )}

              {errors.general && (
                <div className="form-status error">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="profile-form">
                {/* Profile Picture Upload */}
                <div className="form-group">
                  <label htmlFor="profile-pic">Profile Picture</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="profile-pic"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <label htmlFor="profile-pic" className="file-label">
                      <span className="file-icon">📷</span>
                      <span className="file-text">
                        {profilePic ? profilePic.name : 'Choose new profile picture'}
                      </span>
                    </label>
                  </div>
                  {errors.profilePic && (
                    <span className="error-message">{errors.profilePic}</span>
                  )}
                  <small className="form-help">JPG, PNG, GIF up to 5MB</small>
                </div>

                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                {/* Bio Field */}
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={errors.bio ? 'error' : ''}
                    placeholder="Tell us about yourself and your environmental interests..."
                    rows="4"
                    maxLength="500"
                  />
                  {errors.bio && (
                    <span className="error-message">{errors.bio}</span>
                  )}
                  <small className="form-help">
                    {formData.bio.length}/500 characters
                  </small>
                </div>

                {/* Interest Level */}
                <div className="form-group">
                  <label htmlFor="interestLevel">Environmental Experience Level</label>
                  <select
                    id="interestLevel"
                    name="interestLevel"
                    value={formData.interestLevel}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select your experience level</option>
                    {interestLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Account Information */}
                <div className="account-info">
                  <h3>Account Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Email Address</label>
                      <p>{user?.email}</p>
                    </div>
                    <div className="info-item">
                      <label>Username</label>
                      <p>@{user?.username}</p>
                    </div>
                    <div className="info-item">
                      <label>Account Status</label>
                      <p className={`status ${user?.status}`}>
                        {user?.status === 'active' ? '✅ Active' : '⚠️ Inactive'}
                      </p>
                    </div>
                    <div className="info-item">
                      <label>Member Since</label>
                      <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-submit">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
