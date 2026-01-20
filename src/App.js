// src/App.jsx
// Main application component with routing

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import ConfirmationPage from './components/ConfirmationPage';
import HomePage from './pages/HomePage';

/**
 * Main App Component
 * Handles routing and layout for the Little Lemon booking system
 */
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Booking Page */}
            <Route path="/booking" element={<BookingForm />} />
            
            {/* Confirmation Page */}
            <Route path="/confirmation" element={<ConfirmationPage />} />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
