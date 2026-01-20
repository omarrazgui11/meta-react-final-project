import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header>
            <img class="logo" src="./logo.png" alt="Website Logo" />
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="#home">Home</Link></li>
                    <li><Link to="#about">About</Link></li>
                    <li><Link to="#menu">Menu</Link></li>
                    <li><Link to="#reservations">Reservations</Link></li>
                    <li><Link to="#order-online">Order online</Link></li>
                    <li><Link to="#logout">Logout</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;