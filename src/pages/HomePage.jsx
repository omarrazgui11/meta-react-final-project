// src/pages/HomePage.jsx
// Home page component - entry point to the restaurant website

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

// Try to import Main if it exists, otherwise use a fallback
let Main;
try {
  Main = require('../components/Main/Main').default;
} catch (e) {
  // Main component doesn't exist, we'll skip it
  Main = null;
}

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Little Lemon</h1>
            <p className="hero-subtitle">
              A charming neighborhood bistro with a lively atmosphere, serving simple food and 
              classic cocktails in a historic building.
            </p>
            <Link to="/booking" className="hero-button">
              Reserve a Table
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="/images/restaurant-hero.jpg" 
              alt="Little Lemon Restaurant dining area" 
              className="hero-img"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Little+Lemon+Restaurant';
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content - Only render if Main component exists */}
      {Main && <Main />}

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Little Lemon?</h2>
          <p>
            Book your table today and enjoy an unforgettable dining experience with 
            exceptional food and warm hospitality.
          </p>
          <Link to="/booking" className="cta-button">
            Reserve Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;