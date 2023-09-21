import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseDataUpload from './FirebaseDataUpload.js';

import './styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="iconAndHamburger">
        <div className="logo">Our Logo Here</div>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          {/* <FirebaseDataUpload /> */}
          <Link to="/overview"><li>Overview</li></Link>
          <Link to="/customers"><li>Customers</li></Link>
          <Link to="/financial"><li>Financial</li></Link>
          <Link to="/marketing"><li>Marketing</li></Link>
          <Link to="/projects"><li>Projects</li></Link>
          <Link to="/forms"><li>Forms and Form Data</li></Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
