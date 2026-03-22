import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    interestLevel: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const { register, isAuthenticated, error, clearError, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = '⚠️ Full name is required';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = '⚠️ Full name must be at least 2 characters long';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = '⚠️ Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = '⚠️ Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = '⚠️ Username can only contain letters, numbers, and underscores';
    }

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
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '⚠️ Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = '⚠️ Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '⚠️ Passwords do not match';
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = '⚠️ Date of birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.dob = '⚠️ You must be between 13 and 120 years old to register';
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = '⚠️ Please select your gender';
    }

    // Interest Level validation
    if (!formData.interestLevel) {
      newErrors.interestLevel = '⚠️ Please select your experience level';
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = '⚠️ You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    const userData = {
      name: formData.fullname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      dob: formData.dob,
      gender: formData.gender,
      interestLevel: formData.interestLevel
    };

    const result = await register(userData);
    
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p>Creating your account...</p>
      </div>
    );
  }

  const signupBenefits = [
    '🌱 Monthly Newsletter',
    '📅 Event Invitations',
    '📚 Exclusive Resources',
    '🤝 Community Access',
    '💡 Action Alerts'
  ];

  const whyJoinInfo = [
    {
      icon: '🌍',
      title: 'Global Impact',
      description: 'Connect with advocates worldwide and participate in campaigns that create real environmental change across communities and nations.'
    },
    {
      icon: '📖',
      title: 'Learn & Grow',
      description: 'Access educational resources, webinars, and expert insights to deepen your understanding of environmental issues and solutions.'
    },
    {
      icon: '🤝',
      title: 'Build Community',
      description: 'Meet like-minded individuals who share your passion for sustainability and collaborate on local and global environmental projects.'
    }
  ];

  return (
    <div className="register">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="page-header">
        <div className="container">
          <h1>Join Our Community</h1>
          <p>Sign up to receive updates on environmental news, events, and opportunities to make a difference.</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        {/* Sign-Up Benefits Section */}
        <section className="section">
          <div className="container">
            <div className="signup-info">
              <h2>What You'll Receive</h2>
              <p>By joining the EcoVoice community, you'll gain access to valuable resources and stay connected with fellow environmental advocates.</p>
              
              <ul className="signup-benefits">
                {signupBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="section section-light">
          <div className="container">
            <h2 className="text-center">Create Your Account</h2>
            <p className="text-center">Fill out the form below to join thousands of environmental advocates making a difference every day.</p>
            
            {/* Registration Form */}
            <div className="form-container">
              {errors.general && (
                <div className="form-status error">
                  {errors.general}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="form-group">
                  <label htmlFor="reg-fullname">Full Name *</label>
                  <input 
                    type="text" 
                    id="reg-fullname" 
                    name="fullname" 
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name" 
                    className={errors.fullname ? 'error' : ''}
                    required 
                  />
                  {errors.fullname && (
                    <span className="error-message">{errors.fullname}</span>
                  )}
                </div>
                
                {/* Preferred Username Field */}
                <div className="form-group">
                  <label htmlFor="reg-username">Preferred Username *</label>
                  <input 
                    type="text" 
                    id="reg-username" 
                    name="username" 
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username" 
                    className={errors.username ? 'error' : ''}
                    required 
                  />
                  {errors.username && (
                    <span className="error-message">{errors.username}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="reg-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="reg-email" 
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

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="reg-password">Password *</label>
                  <input 
                    type="password" 
                    id="reg-password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password" 
                    minLength="8" 
                    className={errors.password ? 'error' : ''}
                    required 
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label htmlFor="reg-confirm-password">Confirm Password *</label>
                  <input 
                    type="password" 
                    id="reg-confirm-password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password" 
                    minLength="8" 
                    className={errors.confirmPassword ? 'error' : ''}
                    required 
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword}</span>
                  )}
                </div>
                
                {/* Date of Birth Field */}
                <div className="form-group">
                  <label htmlFor="reg-dob">Date of Birth *</label>
                  <input 
                    type="date" 
                    id="reg-dob" 
                    name="dob" 
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? 'error' : ''}
                    required 
                  />
                  {errors.dob && (
                    <span className="error-message">{errors.dob}</span>
                  )}
                </div>

                {/* Gender (Radio Buttons) */}
                <div className="form-group">
                  <label>Gender *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        required 
                      />
                      <span><strong>Female</strong></span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                      />
                      <span><strong>Male</strong></span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="prefer-not-to-say" 
                        checked={formData.gender === 'prefer-not-to-say'}
                        onChange={handleChange}
                      />
                      <span><strong>Prefer not to say</strong></span>
                    </label>
                  </div>
                  {errors.gender && (
                    <span className="error-message">{errors.gender}</span>
                  )}
                </div>
                
                {/* Interest Category (Radio Buttons) */}
                <div className="form-group">
                  <label>Your Experience Level with Environmental Advocacy *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="interestLevel" 
                        value="beginner" 
                        checked={formData.interestLevel === 'beginner'}
                        onChange={handleChange}
                        required 
                      />
                      <span><strong>Beginner</strong> - I'm just starting to learn about environmental issues</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="interestLevel" 
                        value="intermediate" 
                        checked={formData.interestLevel === 'intermediate'}
                        onChange={handleChange}
                      />
                      <span><strong>Intermediate</strong> - I have some knowledge and participate in eco-friendly practices</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="interestLevel" 
                        value="expert" 
                        checked={formData.interestLevel === 'expert'}
                        onChange={handleChange}
                      />
                      <span><strong>Expert</strong> - I'm actively involved in environmental advocacy and campaigns</span>
                    </label>
                  </div>
                  {errors.interestLevel && (
                    <span className="error-message">{errors.interestLevel}</span>
                  )}
                </div>
                
                {/* Terms Agreement (Checkbox) */}
                <div className="form-group">
                  <div className="checkbox-group">
                    <label className={`checkbox-label ${errors.terms ? 'error' : ''}`}>
                      <input 
                        type="checkbox" 
                        name="terms" 
                        checked={formData.terms}
                        onChange={handleChange}
                        required 
                      />
                      <span>I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>. I understand that my information will be used to send environmental advocacy updates and resources. *</span>
                    </label>
                  </div>
                  {errors.terms && (
                    <span className="error-message">{errors.terms}</span>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="form-submit">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </section>

        {/* Decorative Image Section */}
        <section className="section">
          <div className="container">
            <div className="decorative-image">
              <img src="/assets/environmental-community.jpg" alt="Diverse group of environmental advocates holding signs and planting trees together in a community event" />
            </div>
            <p className="text-center mt-lg">
              <em>Join our community of passionate environmental advocates working together for a sustainable future.</em>
            </p>
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="section section-light">
          <div className="container text-center">
            <h2>Why Join EcoVoice?</h2>
            <div className="card-grid">
              {whyJoinInfo.map((info, index) => (
                <div className="card" key={index}>
                  <div className="card-content">
                    <h3>{info.icon} {info.title}</h3>
                    <p>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section">
          <div className="container text-center">
            <h2>Have Questions?</h2>
            <p>If you need more information before signing up, feel free to reach out. We're happy to answer any questions about our community and what you can expect as a member.</p>
            <div className="mt-lg">
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
              <Link to="/about" className="btn btn-secondary">Learn More About Us</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
