// src/utils/constants.js
// Configuration constants for Little Lemon booking system

export const RESTAURANT_INFO = {
  name: 'Little Lemon',
  phone: '(555) 123-4567',
  email: 'info@littlelemon.com',
  address: '123 Main St, Your City, State 12345'
};

export const BUSINESS_HOURS = {
  open: '11:30',
  close: '22:00', // 10:00 PM
  daysOpen: [0, 1, 2, 3, 4, 5, 6] // All days (0 = Sunday)
};

export const BOOKING_CONSTRAINTS = {
  minGuests: 1,
  maxGuests: 10,
  minNameLength: 3,
  maxDateDaysAhead: 60,
  minBookingHours: 1 // Minimum hours before booking (for backend)
};

export const TIME_SLOTS = [
  '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
  '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
  '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
  '20:30', '21:00', '21:30'
];

export const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Engagement',
  'Business Meeting',
  'Family Gathering',
  'Other'
];

export const VALIDATION_MESSAGES = {
  nameRequired: 'Please enter your name',
  nameInvalid: 'Name must be at least 3 characters and contain only letters',
  emailRequired: 'Please enter your email',
  emailInvalid: 'Please enter a valid email address',
  phoneRequired: 'Please enter your phone number',
  phoneInvalid: 'Please enter a valid phone number (10+ digits)',
  dateRequired: 'Please select a date',
  dateInvalid: 'Please select a valid date',
  datePast: 'You cannot book for a past date',
  dateTooFar: `You can only book up to ${BOOKING_CONSTRAINTS.maxDateDaysAhead} days in advance`,
  timeRequired: 'Please select a time',
  timeInvalid: 'Please select a valid time',
  guestsRequired: 'Please select number of guests',
  guestsInvalid: `Party size must be between ${BOOKING_CONSTRAINTS.minGuests} and ${BOOKING_CONSTRAINTS.maxGuests} guests`,
  formError: 'Please fix the errors above and try again',
  submitError: 'Something went wrong. Please try again later.',
  networkError: 'Network error. Please check your connection and try again.'
};

export const API_ENDPOINTS = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  bookings: '/api/bookings',
  availableSlots: '/api/bookings/available-slots'
};

// Color scheme from Little Lemon brand guide
export const COLORS = {
  primary: '#2E7D32',      // Primary Green
  accent: '#FCCF46',       // Accent Yellow
  highlight: '#F67757',    // Highlight Coral
  dark: '#333333',         // Dark Gray
  light: '#EEEEEE',        // Light Gray
  white: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00'
};

export const FONTS = {
  primary: "'Markazi Text', serif",
  secondary: "'Karla', sans-serif"
};
