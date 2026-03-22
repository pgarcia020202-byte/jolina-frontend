import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <header>
      <div className="header-container">
        {/* Logo and Site Title */}
        <div className="logo">
          <div className="logo-icon">🌍</div>
          <span className="logo-text">EcoVoice</span>
        </div>
        
        {/* Navigation Menu */}
        <nav>
          <ul>
            <li>
              <Link 
                to="/home" 
                className={isActive('/home') ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/posts" 
                className={isActive('/posts') ? 'active' : ''}
              >
                Posts
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={isActive('/contact') ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    className={isActive('/profile') ? 'active' : ''}
                  >
                    Profile
                  </Link>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className={isActive('/admin') ? 'active' : ''}
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button 
                    onClick={handleLogout}
                    className="btn-link"
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'inherit', 
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      fontFamily: 'inherit'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/register" 
                    className={isActive('/register') ? 'active' : ''}
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className={isActive('/login') ? 'active' : ''}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <button 
          id="theme-toggle" 
          className="theme-toggle" 
          type="button" 
          onClick={toggleTheme}
          aria-pressed={isDarkMode}
        >
          {isDarkMode ? '☀️ Day' : '🌙 Night'}
        </button>
      </div>
    </header>
  );
};

export default Header;
