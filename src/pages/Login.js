import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const { login, isAuthenticated, error, clearError, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = '⚠️ Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '⚠️ Please enter a valid email address';
    }

    // Password validation
    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = '⚠️ Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = '⚠️ Password must be at least 8 characters long';
    }

    return newErrors;
  };

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any existing errors
    clearError();
    setErrors({});
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData);
    
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p>Logging in...</p>
      </div>
    );
  }

  return (
    <div className="login">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="page-header">
        <div className="container">
          <h1>Login</h1>
          <p>Welcome back! Enter your details to access your EcoVoice account.</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        <section className="section section-light">
          <div className="container">
            <h2 className="text-center">Access Your Account</h2>
            <p className="text-center">Login to connect with fellow environmental advocates.</p>

            <div className="form-container">
              {errors.general && (
                <div className="form-status error">
                  {errors.general}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="login-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="login-email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@example.com" 
                    className={errors.email ? 'error' : ''}
                    required 
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Password *</label>
                  <input 
                    type="password" 
                    id="login-password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password" 
                    minLength="8" 
                    className={errors.password ? 'error' : ''}
                    required 
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-submit">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>

            
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container text-center">
            <h2>New to EcoVoice?</h2>
            <p>Create an account to join our community and receive environmental advocacy updates.</p>
            <div className="mt-lg">
              <Link to="/register" className="btn btn-secondary">Create an Account</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
