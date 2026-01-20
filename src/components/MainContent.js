import React from 'react';
import heroImage from '../assets/HeroSection.jpg';
import styles from './MainContent.module.css';
import FoodCard from './FoodCard';

const greekSalad = {
    name: "Greek Salad",
    description: "The famous greek salad of crispy lettuce, peppers, tomatoes, and our famous feta cheese.",
    price: 13.99,
    image: "../assets/greek-salad.jpg"
};

const MainContent = () => {
    let heroText = "We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.";
    let location = "Chicago";
    return (
        <main>
            <section className={styles.heroContainer}>
                <article className={styles.article}>
                    <h2 className={styles.title}>Little Lemon</h2>
                    <p className={styles.location}>
                        {location}
                    </p>
                    <p className={styles.description}>

                        {heroText}
                    </p>
                </article>
                <img className={styles.HeroImage} src={heroImage} alt="Hero" />
            </section>
            <section className="highlight-section">
                <FoodCard food={greekSalad} />
            </section>
            <section className="testimonials-section">

            </section>
            <section className="about-section">

            </section>

        </main>
    );
}
export default MainContent;