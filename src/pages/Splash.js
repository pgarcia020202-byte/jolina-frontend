import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const [dotCount, setDotCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animate the dots
    const dotInterval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    // After 2 seconds, start fade out and redirect
    const redirectTimer = setTimeout(() => {
      clearInterval(dotInterval);
      setFadeOut(true);
      
      // Redirect after fade animation
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }, 2000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="loader-body">
      <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loader-logo">🌍</div>
        <h1>EcoVoice</h1>
        <div className="loader-spinner" aria-hidden="true"></div>
        <div className="loader-text">
          Loading<span className="loader-dots">{'.'.repeat(dotCount)}</span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
