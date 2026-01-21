// src/components/AboutSection.jsx
// About section component with semantic HTML

import React from 'react';
import '../styles/AboutSection.css';

/**
 * AboutSection Component
 * Restaurant information and contact details
 */
const AboutSection = () => {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="about-container">
        <div className="about-content">
          <h2 id="about-title">Little Lemon</h2>
          <p className="about-subtitle">Chicago</p>
          
          <p className="about-description">
            Little Lemon is a charming neighborhood bistro nestled in the heart of Chicago. 
            For over a decade, we've been the go-to destination for authentic Mediterranean 
            cuisine and warm hospitality. Our commitment to quality ingredients and time-honored 
            recipes ensures every visit is memorable.
          </p>
        </div>

        <footer className="about-footer">
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-section">
              <h3>Doorman</h3>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <address>
                <p>123 Lemon Street</p>
                <p>Chicago, IL 60601</p>
                <p><a href="tel:+13125551234">(312) 555-1234</a></p>
                <p><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></p>
              </address>
            </div>

            <div className="footer-section">
              <h3>Social Media Links</h3>
              <ul>
                <li><a href="#facebook" aria-label="Visit our Facebook page">Facebook</a></li>
                <li><a href="#instagram" aria-label="Visit our Instagram profile">Instagram</a></li>
                <li><a href="#twitter" aria-label="Visit our Twitter account">Twitter</a></li>
              </ul>
            </div>
          </nav>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;