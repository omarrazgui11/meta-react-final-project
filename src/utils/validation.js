// src/utils/validation.js
// Form validation logic with comprehensive error checking

import {
  BOOKING_CONSTRAINTS,
  VALIDATION_MESSAGES,
  TIME_SLOTS
} from './constants';

/**
 * Validates a full name
 * @param {string} name - The name to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: VALIDATION_MESSAGES.nameRequired };
  }
  
  if (name.trim().length < BOOKING_CONSTRAINTS.minNameLength) {
    return { isValid: false, error: VALIDATION_MESSAGES.nameInvalid };
  }
  
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: VALIDATION_MESSAGES.nameInvalid };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates email address
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: VALIDATION_MESSAGES.emailRequired };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: VALIDATION_MESSAGES.emailInvalid };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates phone number
 * @param {string} phone - Phone number to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: VALIDATION_MESSAGES.phoneRequired };
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: VALIDATION_MESSAGES.phoneInvalid };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates booking date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateDate = (date) => {
  if (!date || date.trim().length === 0) {
    return { isValid: false, error: VALIDATION_MESSAGES.dateRequired };
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { isValid: false, error: VALIDATION_MESSAGES.datePast };
  }
  
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + BOOKING_CONSTRAINTS.maxDateDaysAhead);
  
  if (selectedDate > maxDate) {
    return { isValid: false, error: VALIDATION_MESSAGES.dateTooFar };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates booking time
 * @param {string} time - Time in HH:MM format
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateTime = (time) => {
  if (!time || time.trim().length === 0) {
    return { isValid: false, error: VALIDATION_MESSAGES.timeRequired };
  }
  
  if (!TIME_SLOTS.includes(time)) {
    return { isValid: false, error: VALIDATION_MESSAGES.timeInvalid };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates number of guests
 * @param {number} guests - Number of guests
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateGuests = (guests) => {
  const guestNum = parseInt(guests, 10);
  
  if (isNaN(guestNum) || guestNum < BOOKING_CONSTRAINTS.minGuests || 
      guestNum > BOOKING_CONSTRAINTS.maxGuests) {
    return { isValid: false, error: VALIDATION_MESSAGES.guestsInvalid };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates special requests (optional field)
 * @param {string} requests - Special requests text
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateSpecialRequests = (requests) => {
  // Optional field - only check if it's reasonable length
  if (requests && requests.length > 500) {
    return { isValid: false, error: 'Special requests must be 500 characters or less' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validates entire booking form
 * @param {object} formData - The form data to validate
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateBookingForm = (formData) => {
  const errors = {};
  
  // Validate each field
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) errors.name = nameValidation.error;
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error;
  
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) errors.phone = phoneValidation.error;
  
  const dateValidation = validateDate(formData.date);
  if (!dateValidation.isValid) errors.date = dateValidation.error;
  
  const timeValidation = validateTime(formData.time);
  if (!timeValidation.isValid) errors.time = timeValidation.error;
  
  const guestsValidation = validateGuests(formData.guests);
  if (!guestsValidation.isValid) errors.guests = guestsValidation.error;
  
  const requestsValidation = validateSpecialRequests(formData.specialRequests);
  if (!requestsValidation.isValid) errors.specialRequests = requestsValidation.error;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitizes input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

/**
 * Formats time string to 12-hour format with AM/PM
 * @param {string} time24 - Time in 24-hour format (HH:MM)
 * @returns {string} - Time in 12-hour format
 */
export const formatTime12Hour = (time24) => {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12}:${minutes} ${ampm}`;
};

/**
 * Formats date to readable format
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date (e.g., "January 15, 2024")
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Generates a confirmation number
 * @returns {string} - A unique confirmation number
 */
export const generateConfirmationNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LL-${timestamp}-${random}`;
};
