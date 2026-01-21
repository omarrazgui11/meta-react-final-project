// src/components/TestimonialsSection.jsx
// Testimonials section component with semantic HTML

import React from 'react';
import '../styles/TestimonialsSection.css';

/**
 * TestimonialsSection Component
 * Displays customer reviews and ratings
 */
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      author: 'S. Alex',
      rating: 5,
      text: 'Exceptional dining experience! The flavors were exquisite and the service impeccable.'
    },
    {
      id: 2,
      author: 'S. Alex',
      rating: 5,
      text: 'An absolute gem! Cozy ambiance, friendly staff, and delicious food.'
    },
    {
      id: 3,
      author: 'S. Alex',
      rating: 5,
      text: 'Cannot recommend enough. Best Mediterranean cuisine in the city!'
    },
    {
      id: 4,
      author: 'S. Alex',
      rating: 5,
      text: 'Perfect place for special occasions. Wonderful attention to detail.'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`star ${i < rating ? 'filled' : 'empty'}`}
        aria-hidden="true"
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-container">
        <h2 id="testimonials-title">Testimonials</h2>
        
        <div className="testimonials-grid" role="list">
          {testimonials.map((testimonial) => (
            <article 
              key={testimonial.id} 
              className="testimonial-card"
              role="listitem"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
                <span className="sr-only" itemProp="reviewRating">
                  {testimonial.rating} out of 5 stars
                </span>
              </div>
              <p 
                className="testimonial-author" 
                itemProp="author"
              >
                {testimonial.author}
              </p>
              <p 
                className="testimonial-text"
                itemProp="reviewBody"
              >
                {testimonial.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;