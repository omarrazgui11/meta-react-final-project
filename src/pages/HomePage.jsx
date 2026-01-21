// src/pages/HomePage.jsx
// Home page component - entry point to the restaurant website
// Refactored with semantic HTML and proper structure

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import HeroSection from '../components/HeroSection';
import SpecialsSection from '../components/SpecialsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';

/**
 * HomePage Component
 * Main landing page with semantic HTML structure
 */
const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Specials Section */}
      <SpecialsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default HomePage;