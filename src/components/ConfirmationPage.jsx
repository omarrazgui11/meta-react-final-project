// src/components/ConfirmationPage.jsx
// Booking confirmation page

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';
import { formatDate, formatTime12Hour } from '../utils/validation';

/**
 * ConfirmationPage Component
 * Displays booking confirmation details
 */
const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    // Try to get booking from location state first
    if (location.state?.booking) {
      setBooking(location.state.booking);
    } else {
      // Fall back to sessionStorage
      const lastBooking = sessionStorage.getItem('lastBooking');
      if (lastBooking) {
        setBooking(JSON.parse(lastBooking));
      } else {
        // Redirect if no booking found
        navigate('/booking');
      }
    }
  }, [location, navigate]);

  /**
   * Copies confirmation number to clipboard
   */
  const copyConfirmationNumber = () => {
    if (booking?.confirmationNumber) {
      navigator.clipboard.writeText(booking.confirmationNumber).then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      });
    }
  };

  /**
   * Prints the confirmation page
   */
  const printConfirmation = () => {
    window.print();
  };

  if (!booking) {
    return (
      <div className="confirmation-container loading">
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <main className="confirmation-container" role="main">
      <div className="confirmation-wrapper">
        {/* Success Header */}
        <section className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1 className="confirmation-title">Reservation Confirmed!</h1>
          <p className="confirmation-subtitle">
            Thank you for choosing Little Lemon. Your reservation is confirmed.
          </p>
        </section>

        {/* Confirmation Number */}
        <section className="confirmation-number-section" aria-label="Confirmation number">
          <p className="confirmation-number-label">Confirmation Number</p>
          <div className="confirmation-number-box">
            <code className="confirmation-number">{booking.confirmationNumber}</code>
            <button
              onClick={copyConfirmationNumber}
              className="copy-button"
              aria-label="Copy confirmation number"
              title="Copy to clipboard"
            >
              📋 Copy
            </button>
          </div>
          {showCopied && (
            <span className="copy-feedback" role="status">
              Copied!
            </span>
          )}
        </section>

        {/* Booking Details */}
        <section className="booking-details" aria-label="Booking details">
          <h2 className="details-title">Booking Details</h2>
          
          <div className="details-grid">
            {/* Guest Name */}
            <div className="detail-item">
              <span className="detail-label">Guest Name</span>
              <span className="detail-value">{booking.name}</span>
            </div>

            {/* Email */}
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{booking.email}</span>
            </div>

            {/* Phone */}
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{booking.phone}</span>
            </div>

            {/* Date */}
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">
                {formatDate(booking.date)}
              </span>
            </div>

            {/* Time */}
            <div className="detail-item">
              <span className="detail-label">Time</span>
              <span className="detail-value">
                {formatTime12Hour(booking.time)}
              </span>
            </div>

            {/* Party Size */}
            <div className="detail-item">
              <span className="detail-label">Party Size</span>
              <span className="detail-value">
                {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>

            {/* Occasion */}
            {booking.occasion && booking.occasion !== 'Other' && (
              <div className="detail-item">
                <span className="detail-label">Occasion</span>
                <span className="detail-value">{booking.occasion}</span>
              </div>
            )}

            {/* Special Requests */}
            {booking.specialRequests && (
              <div className="detail-item detail-item-full">
                <span className="detail-label">Special Requests</span>
                <span className="detail-value">{booking.specialRequests}</span>
              </div>
            )}
          </div>
        </section>

        {/* Important Information */}
        <section className="confirmation-info">
          <h2 className="info-title">Important Information</h2>
          
          <ul className="info-list">
            <li>
              📧 <strong>Confirmation Email:</strong> A confirmation email has been sent to{' '}
              <code>{booking.email}</code>
            </li>
            <li>
              ⏰ <strong>Arrival Time:</strong> Please arrive 10-15 minutes before your
              reservation time
            </li>
            <li>
              📝 <strong>Cancellation:</strong> To cancel or modify your reservation, please
              call us at <a href="tel:+15551234567">(555) 123-4567</a>
            </li>
            <li>
              📍 <strong>Location:</strong> 123 Main St, Your City, State 12345
            </li>
            <li>
              🍽️ <strong>Menu:</strong> View our full menu at{' '}
              <a href="/" target="_blank" rel="noopener noreferrer">
                littlelemon.com
              </a>
            </li>
          </ul>
        </section>

        {/* Action Buttons */}
        <section className="confirmation-actions">
          <button
            onClick={printConfirmation}
            className="action-button print-button"
            aria-label="Print confirmation"
          >
            🖨️ Print Confirmation
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="action-button home-button"
            aria-label="Return to home page"
          >
            🏠 Back to Home
          </button>
          
          <button
            onClick={() => navigate('/booking')}
            className="action-button booking-button"
            aria-label="Make another reservation"
          >
            📅 Make Another Reservation
          </button>
        </section>

        {/* Footer Message */}
        <section className="confirmation-footer">
          <p>
            We look forward to welcoming you at <strong>Little Lemon!</strong>
          </p>
          <p className="footer-text">
            Questions? Contact us at{' '}
            <a href="tel:+15551234567">(555) 123-4567</a> or{' '}
            <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
          </p>
        </section>
      </div>

      {/* Print-only content */}
      <div className="print-only">
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          Confirmation Number: {booking.confirmationNumber}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Printed on: {new Date().toLocaleString()}
        </p>
      </div>
    </main>
  );
};

export default ConfirmationPage;
