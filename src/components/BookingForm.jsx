// src/components/BookingForm.jsx
// Main booking form component with full accessibility and validation

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';
import {
  validateBookingForm,
  sanitizeInput,
  generateConfirmationNumber
} from '../utils/validation';
import {
  TIME_SLOTS,
  OCCASIONS,
  BOOKING_CONSTRAINTS
} from '../utils/constants';

const BookingForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    occasion: 'Other',
    specialRequests: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  /**
   * Generates available dates (today through max days ahead)
   */
  const getAvailableDates = useCallback(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i <= BOOKING_CONSTRAINTS.maxDateDaysAhead; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }, []);
  
  const availableDates = getAvailableDates();
  const minDate = availableDates[0];
  const maxDate = availableDates[availableDates.length - 1];
  
  /**
   * Handles input change for text fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  /**
   * Handles select field change
   */
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Validate form
    const validation = validateBookingForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setFormError('Please fix the errors above and try again');
      
      // Announce error to screen readers
      const errorButton = document.getElementById('submit-button');
      if (errorButton) {
        errorButton.setAttribute('aria-live', 'polite');
        errorButton.setAttribute('aria-label', 'Form submission failed. Please fix the errors above.');
      }
      
      return;
    }
    
    // Clear errors if validation passed
    setErrors({});
    setIsSubmitting(true);
    
    try {
      // Simulate API call - Replace with actual API call
      const confirmationNumber = generateConfirmationNumber();
      
      // Mock API response
      const bookingData = {
        ...formData,
        bookingId: confirmationNumber,
        confirmationNumber,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };
      
      // Store booking for confirmation page
      sessionStorage.setItem('lastBooking', JSON.stringify(bookingData));
      
      setSubmitSuccess(true);
      
      // Redirect to confirmation page after brief delay
      setTimeout(() => {
        navigate('/confirmation', { state: { booking: bookingData } });
      }, 1500);
      
    } catch (error) {
      console.error('Booking submission error:', error);
      setFormError('Something went wrong. Please try again later.');
      
      // Announce error to screen readers
      const errorElement = document.getElementById('form-error');
      if (errorElement) {
        errorElement.setAttribute('aria-live', 'assertive');
        errorElement.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="booking-form-container" role="main">
      <div className="booking-form-wrapper">
        <section className="booking-form-section">
          <h1 className="booking-form-title">Reserve a Table</h1>
          <p className="booking-form-subtitle">Join us for an unforgettable dining experience</p>
          
          {/* Form Error Alert */}
          {formError && (
            <div
              id="form-error"
              className="form-error-alert"
              role="alert"
              aria-live="assertive"
              tabIndex="-1"
            >
              <span className="error-icon">⚠️</span>
              <span className="error-text">{formError}</span>
            </div>
          )}
          
          {/* Success Message */}
          {submitSuccess && (
            <div
              className="form-success-alert"
              role="status"
              aria-live="polite"
            >
              <span className="success-icon">✓</span>
              <span className="success-text">Booking confirmed! Redirecting...</span>
            </div>
          )}
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="booking-form" noValidate>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required-indicator" aria-label="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="John Doe"
                required
                disabled={isSubmitting}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <span id="name-error" className="field-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>
            
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span className="required-indicator" aria-label="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <span id="email-error" className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
            
            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone <span className="required-indicator" aria-label="required">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="(555) 123-4567"
                required
                disabled={isSubmitting}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
              {errors.phone && (
                <span id="phone-error" className="field-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
            
            {/* Date & Time Row */}
            <div className="form-row">
              {/* Date Field */}
              <div className="form-group form-group-half">
                <label htmlFor="date" className="form-label">
                  Date <span className="required-indicator" aria-label="required">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleSelectChange}
                  className={`form-input ${errors.date ? 'input-error' : ''}`}
                  min={minDate}
                  max={maxDate}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? 'date-error' : undefined}
                />
                {errors.date && (
                  <span id="date-error" className="field-error" role="alert">
                    {errors.date}
                  </span>
                )}
              </div>
              
              {/* Time Field */}
              <div className="form-group form-group-half">
                <label htmlFor="time" className="form-label">
                  Time <span className="required-indicator" aria-label="required">*</span>
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleSelectChange}
                  className={`form-input form-select ${errors.time ? 'input-error' : ''}`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? 'time-error' : undefined}
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <span id="time-error" className="field-error" role="alert">
                    {errors.time}
                  </span>
                )}
              </div>
            </div>
            
            {/* Guests & Occasion Row */}
            <div className="form-row">
              {/* Guests Field */}
              <div className="form-group form-group-half">
                <label htmlFor="guests" className="form-label">
                  Number of Guests <span className="required-indicator" aria-label="required">*</span>
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleSelectChange}
                  className={`form-input form-select ${errors.guests ? 'input-error' : ''}`}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!errors.guests}
                  aria-describedby={errors.guests ? 'guests-error' : undefined}
                >
                  {Array.from(
                    { length: BOOKING_CONSTRAINTS.maxGuests },
                    (_, i) => i + 1
                  ).map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <span id="guests-error" className="field-error" role="alert">
                    {errors.guests}
                  </span>
                )}
              </div>
              
              {/* Occasion Field */}
              <div className="form-group form-group-half">
                <label htmlFor="occasion" className="form-label">
                  Occasion (Optional)
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleSelectChange}
                  className="form-input form-select"
                  disabled={isSubmitting}
                >
                  {OCCASIONS.map(occ => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Special Requests Field */}
            <div className="form-group">
              <label htmlFor="specialRequests" className="form-label">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className={`form-input form-textarea ${errors.specialRequests ? 'input-error' : ''}`}
                placeholder="Any dietary restrictions, allergies, or special preferences?"
                maxLength="500"
                disabled={isSubmitting}
                aria-invalid={!!errors.specialRequests}
                aria-describedby={errors.specialRequests ? 'specialRequests-error' : 'specialRequests-count'}
              />
              <span id="specialRequests-count" className="char-count">
                {formData.specialRequests.length}/500 characters
              </span>
              {errors.specialRequests && (
                <span id="specialRequests-error" className="field-error" role="alert">
                  {errors.specialRequests}
                </span>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="form-actions">
              <button
                id="submit-button"
                type="submit"
                className="submit-button"
                disabled={isSubmitting || submitSuccess}
                aria-busy={isSubmitting}
                aria-label={isSubmitting ? 'Submitting booking...' : 'Submit booking'}
              >
                {isSubmitting ? 'Booking...' : 'Complete Reservation'}
              </button>
              <p className="form-note">
                {' '}* Required fields. We'll confirm your reservation shortly.
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default BookingForm;
