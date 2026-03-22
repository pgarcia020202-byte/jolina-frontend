import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = '⚠️ Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '⚠️ Name must be at least 2 characters long';
    }

    // Email validation
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = '⚠️ Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '⚠️ Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = '⚠️ Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '⚠️ Message must be at least 10 characters long';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = '⚠️ Message must be less than 1000 characters';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Since this is a demo form, we'll just show a success message
    setFormStatus('Thank you for your message! This is a demo form, so no actual email was sent.');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    
    // Clear status message after 5 seconds
    setTimeout(() => setFormStatus(''), 5000);
  };

  const environmentalResources = [
    {
      name: "EPA Climate Change Resources",
      description: "Comprehensive information from the Environmental Protection Agency about climate science, impacts, and solutions for individuals and communities."
    },
    {
      name: "World Wildlife Fund (WWF) Guides",
      description: "Educational materials and practical guides on wildlife conservation, habitat protection, and sustainable living practices."
    },
    {
      name: "The Nature Conservancy Toolkit",
      description: "Science-based tools and resources for land and water conservation, including local action guides and volunteer opportunities."
    },
    {
      name: "UN Environment Programme Reports",
      description: "Global environmental assessments, policy recommendations, and data on biodiversity, climate, and sustainable development goals."
    },
    {
      name: "Project Drawdown Solutions",
      description: "Research-backed climate solutions ranked by impact, with detailed information on implementation and benefits of each approach."
    }
  ];

  return (
    <div className="contact">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="page-header">
        <div className="container">
          <h1>Contact & Resources</h1>
          <p>Get in touch with us and explore valuable resources for environmental advocacy and sustainable living.</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        {/* Contact Form Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-center">Get in Touch</h2>
            <p className="text-center">Have questions, ideas, or want to collaborate? We'd love to hear from you! Fill out the form below and we'll respond as soon as possible.</p>
            
            {/* Contact Form */}
            <div className="form-container">
              {formStatus && (
                <div className="form-status success">
                  {formStatus}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name" 
                    className={errors.name ? 'error' : ''}
                    required 
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>
                
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="contact-email" 
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
                
                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea 
                    id="contact-message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your thoughts, questions, or ideas about environmental advocacy..." 
                    className={errors.message ? 'error' : ''}
                    required 
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="form-submit">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Resources Table Section */}
        <section className="section section-light">
          <div className="container">
            <h2 className="text-center">Environmental Resources</h2>
            <p className="text-center">Explore these valuable resources to learn more about environmental issues and how you can make a difference.</p>
            
            {/* Resource Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Resource Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {environmentalResources.map((resource, index) => (
                    <tr key={index}>
                      <td><strong>{resource.name}</strong></td>
                      <td>{resource.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Map Placeholder Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-center">Find Us</h2>
            <p className="text-center">Our community hub is located in the heart of Green City. Visit us to learn more about local environmental initiatives!</p>
            
            {/* Embedded Map Placeholder */}
            <div className="map-container">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4194%2C37.7749%2C-122.4094%2C37.7849&amp;layer=mapnik" 
                title="Location map showing Green City Environmental Hub"
                loading="lazy"
              />
            </div>
            <p className="text-center"><em>Note: This is a placeholder location for demonstration purposes.</em></p>
          </div>
        </section>

        {/* External Links Section */}
        <section className="section section-light">
          <div className="container">
            <h2 className="text-center">Trusted Environmental Organizations</h2>
            <p className="text-center">Connect with these credible organizations leading the fight for environmental protection worldwide.</p>
            
            {/* External Links */}
            <div className="external-links" style={{ justifyContent: 'center' }}>
              <a href="https://www.worldwildlife.org" target="_blank" rel="noopener noreferrer" className="external-link">
                World Wildlife Fund
              </a>
              <a href="https://www.nature.org" target="_blank" rel="noopener noreferrer" className="external-link">
                The Nature Conservancy
              </a>
              <a href="https://www.unep.org" target="_blank" rel="noopener noreferrer" className="external-link">
                UN Environment Programme
              </a>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section">
          <div className="container text-center">
            <h2>Stay Connected</h2>
            <p>Want to receive updates on environmental news, events, and opportunities? Sign up for our newsletter and become part of our growing community of advocates.</p>
            <div className="mt-lg">
              <Link to="/register" className="btn btn-primary">Sign Up for Updates</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
