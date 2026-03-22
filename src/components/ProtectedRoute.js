import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = 'member' }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  if (requiredRole === 'member' && user?.role === 'guest') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
