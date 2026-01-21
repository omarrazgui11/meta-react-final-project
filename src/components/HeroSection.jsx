// src/components/HeroSection.jsx
// Hero section component with semantic HTML

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';
import heroImage from '../assets/HeroSection.jpg';

/**
 * HeroSection Component
 * Main hero banner with CTA
 */
const HeroSection = () => {
  return (
    <header className="hero-section" role="banner">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Little Lemon</h1>
          <p className="hero-subtitle">
            A charming neighborhood bistro with a lively atmosphere, serving simple 
            food and classic cocktails in a historic building.
          </p>
          <Link to="/booking" className="hero-button">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src={heroImage} 
            alt="Restaurant ambiance - Little Lemon" 
            className="hero-img"
          />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;