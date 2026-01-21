// src/components/SpecialsSection.jsx
// Specials section component with semantic HTML

import React from 'react';
import '../styles/SpecialsSection.css';

/**
 * SpecialsSection Component
 * Displays featured menu items
 */
const SpecialsSection = () => {
  const specials = [
    {
      id: 1,
      name: 'Greek Salad',
      price: '$9.99',
      description:
        'The famous greek salad of crispy vegetables and all mediterranean classics. Topped with feta cheese.',
      image: 'placeholder-greek-salad.jpg'
    },
    {
      id: 2,
      name: 'Bruschettas',
      price: '$5.99',
      description:
        'Our Bruschetta is made from homemade Italian bread that has been toasted and topped with tomatoes, garlic, and oregano.',
      image: 'placeholder-bruschetta.jpg'
    },
    {
      id: 3,
      name: 'Lemon Dessert',
      price: '$5.00',
      description:
        'This comes straight from a family recipe passed down for generations. It is as simple as timeless; a bowl of citrus.',
      image: 'placeholder-lemon-dessert.jpg'
    }
  ];

  return (
    <section className="specials-section" aria-labelledby="specials-title">
      <div className="specials-container">
        <div className="specials-header">
          <h2 id="specials-title">Specials</h2>
          <button className="online-menu-btn" aria-label="View full online menu">
            Online menu
          </button>
        </div>

        <article className="specials-grid">
          {specials.map((special) => (
            <div key={special.id} className="special-card">
              <div className="special-image-placeholder">
                <img 
                  src={special.image} 
                  alt={special.name}
                  className="special-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="special-content">
                <h3>{special.name}</h3>
                <p className="special-price">{special.price}</p>
                <p className="special-description">{special.description}</p>
                <button className="order-btn" aria-label={`Order ${special.name}`}>
                  Order a delivery
                </button>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};

export default SpecialsSection;