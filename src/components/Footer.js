import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h4>EcoVoice</h4>
          <p>Dedicated to environmental advocacy and sustainable living. Together, we can protect our planet for future generations.</p>
        </div>
        
        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-nav">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact & Resources</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: hello@ecovoice.example.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Location: Green City, Earth</p>
        </div>
      </div>
      
      {/* Copyright Notice */}
      <div className="footer-bottom">
        <p>&copy; 2024 EcoVoice Environmental Advocacy. All rights reserved. | Created by Jolina Nalica</p>
      </div>
    </footer>
  );
};

export default Footer;
