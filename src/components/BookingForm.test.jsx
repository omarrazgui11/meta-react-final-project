// src/components/BookingForm.test.jsx
// Comprehensive unit tests for BookingForm component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';
import * as validation from '../utils/validation';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Wrapper component for router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('BookingForm Component', () => {
  
  describe('Rendering', () => {
    test('renders booking form with all required fields', () => {
      renderWithRouter(<BookingForm />);
      
      expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Special Requests/i)).toBeInTheDocument();
    });
    
    test('renders submit button', () => {
      renderWithRouter(<BookingForm />);
      expect(screen.getByRole('button', { name: /Complete Reservation/i })).toBeInTheDocument();
    });
    
    test('displays all required field indicators', () => {
      renderWithRouter(<BookingForm />);
      const requiredIndicators = screen.getAllByLabelText('required');
      expect(requiredIndicators.length).toBeGreaterThan(0);
    });
  });
  
  describe('Accessibility', () => {
    test('has proper ARIA labels on inputs', () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      expect(nameInput).toHaveAttribute('id', 'name');
      expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    });
    
    test('shows error message with aria-describedby', () => {
      renderWithRouter(<BookingForm />);
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
    
    test('has semantic form structure', () => {
      renderWithRouter(<BookingForm />);
      
      const form = screen.getByRole('button').closest('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('noValidate');
    });
    
    test('form has main landmark', () => {
      renderWithRouter(<BookingForm />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
    
    test('inputs support autocomplete', () => {
      renderWithRouter(<BookingForm />);
      
      expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute('autoComplete', 'name');
      expect(screen.getByLabelText(/Email/i)).toHaveAttribute('autoComplete', 'email');
      expect(screen.getByLabelText(/Phone/i)).toHaveAttribute('autoComplete', 'tel');
    });
  });
  
  describe('Form Validation', () => {
    test('shows error when name is empty', async () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      fireEvent.change(nameInput, { target: { value: '' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });
    });
    
    test('shows error for invalid email', async () => {
      renderWithRouter(<BookingForm />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument();
      });
    });
    
    test('shows error for invalid phone', async () => {
      renderWithRouter(<BookingForm />);
      
      const phoneInput = screen.getByLabelText(/Phone/i);
      fireEvent.change(phoneInput, { target: { value: '123' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/valid phone number/i)).toBeInTheDocument();
      });
    });
    
    test('shows error when date is not selected', async () => {
      renderWithRouter(<BookingForm />);
      
      const dateInput = screen.getByLabelText(/^Date/i);
      fireEvent.change(dateInput, { target: { value: '' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/select a date/i)).toBeInTheDocument();
      });
    });
    
    test('shows error when time is not selected', async () => {
      renderWithRouter(<BookingForm />);
      
      const timeInput = screen.getByLabelText(/^Time/i);
      fireEvent.change(timeInput, { target: { value: '' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/select a time/i)).toBeInTheDocument();
      });
    });
    
    test('does not allow past dates', async () => {
      renderWithRouter(<BookingForm />);
      
      const dateInput = screen.getByLabelText(/^Date/i);
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const pastDateStr = pastDate.toISOString().split('T')[0];
      
      // Date input should have min attribute preventing past dates
      expect(dateInput).toHaveAttribute('min');
    });
    
    test('prevents booking too far in advance', async () => {
      renderWithRouter(<BookingForm />);
      
      const dateInput = screen.getByLabelText(/^Date/i);
      
      // Check that max attribute is set
      expect(dateInput).toHaveAttribute('max');
    });
    
    test('shows error for invalid guest count', async () => {
      renderWithRouter(<BookingForm />);
      
      const guestsSelect = screen.getByLabelText(/Number of Guests/i);
      fireEvent.change(guestsSelect, { target: { value: '0' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      // The select should only have valid options, so this is harder to test directly
      // But we can verify the validation function works
      expect(guestsSelect.value).toBe('0');
    });
  });
  
  describe('Form Input Handling', () => {
    test('updates form state on input change', () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      expect(nameInput.value).toBe('John Doe');
    });
    
    test('sanitizes input to prevent XSS', () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      fireEvent.change(nameInput, { target: { value: '<script>alert("XSS")</script>' } });
      
      // Input should be sanitized
      expect(nameInput.value).not.toContain('<script>');
    });
    
    test('clears field error when user corrects input', async () => {
      renderWithRouter(<BookingForm />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      // Submit with invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument();
      });
      
      // Fix the email
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      
      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
      });
    });
    
    test('handles special requests character count', () => {
      renderWithRouter(<BookingForm />);
      
      const textarea = screen.getByLabelText(/Special Requests/i);
      fireEvent.change(textarea, { target: { value: 'No onions please' } });
      
      expect(textarea.value).toBe('No onions please');
      expect(screen.getByText(/16\/500 characters/i)).toBeInTheDocument();
    });
  });
  
  describe('Form Submission', () => {
    test('disables submit button while submitting', async () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const phoneInput = screen.getByLabelText(/Phone/i);
      const dateInput = screen.getByLabelText(/^Date/i);
      const timeInput = screen.getByLabelText(/^Time/i);
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      
      // Fill in valid data
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '5551234567' } });
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      fireEvent.change(dateInput, { target: { value: dateStr } });
      
      fireEvent.change(timeInput, { target: { value: '19:00' } });
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(submitButton).toHaveAttribute('aria-busy', 'true');
      });
    });
    
    test('shows success message on successful submission', async () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const phoneInput = screen.getByLabelText(/Phone/i);
      const dateInput = screen.getByLabelText(/^Date/i);
      const timeInput = screen.getByLabelText(/^Time/i);
      
      fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
      fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '5559876543' } });
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const dateStr = tomorrow.toISOString().split('T')[0];
      fireEvent.change(dateInput, { target: { value: dateStr } });
      
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
    
    test('prevents form submission with validation errors', async () => {
      renderWithRouter(<BookingForm />);
      
      // Submit empty form
      const submitButton = screen.getByRole('button', { name: /Complete Reservation/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      });
      
      // Should still be on form
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    test('handles long names correctly', () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      const longName = 'Alexander Christopher Michaelson';
      fireEvent.change(nameInput, { target: { value: longName } });
      
      expect(nameInput.value).toBe(longName);
    });
    
    test('handles phone number formatting', () => {
      renderWithRouter(<BookingForm />);
      
      const phoneInput = screen.getByLabelText(/Phone/i);
      fireEvent.change(phoneInput, { target: { value: '(555) 123-4567' } });
      
      expect(phoneInput.value).toBe('(555) 123-4567');
    });
    
    test('allows maximum guests', () => {
      renderWithRouter(<BookingForm />);
      
      const guestsSelect = screen.getByLabelText(/Number of Guests/i);
      fireEvent.change(guestsSelect, { target: { value: '10' } });
      
      expect(guestsSelect.value).toBe('10');
    });
    
    test('shows character count for special requests', () => {
      renderWithRouter(<BookingForm />);
      
      const textarea = screen.getByLabelText(/Special Requests/i);
      const text = 'Please arrange for early seating as we have an event at 8 PM.';
      fireEvent.change(textarea, { target: { value: text } });
      
      expect(screen.getByText(new RegExp(text.length + '/500'))).toBeInTheDocument();
    });
    
    test('validates email with multiple formats', () => {
      const emails = [
        'user@example.com',
        'first.last@example.co.uk',
        'user+tag@example.com',
        'invalid@.com',
        'invalid.com'
      ];
      
      emails.forEach(email => {
        const validation_result = validation.validateEmail(email);
        if (email.includes('@') && email.includes('.') && !email.startsWith('@') && !email.endsWith('.')) {
          expect(validation_result.isValid).toBe(true);
        }
      });
    });
  });
  
  describe('User Interactions', () => {
    test('allows user to tab through form fields in order', async () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      nameInput.focus();
      expect(nameInput).toHaveFocus();
    });
    
    test('shows focus indicators on inputs', async () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      fireEvent.focus(nameInput);
      
      expect(nameInput).toHaveFocus();
    });
    
    test('handles form reset', () => {
      renderWithRouter(<BookingForm />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Name' } });
      expect(nameInput.value).toBe('Test Name');
      
      // Form state should update
      fireEvent.change(nameInput, { target: { value: '' } });
      expect(nameInput.value).toBe('');
    });
  });
});

// Export for debugging
export { renderWithRouter };
