import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">Our Logo Here</div>
      <nav className="nav">
        <ul>
          <Link to="/overview"><li>Overview</li></Link>
          <Link to="/customers"><li>Customers</li></Link>
          <Link to="/financial"><li>Financial</li></Link>
          <Link to="/marketing"><li>Marketing</li></Link>
          <Link to="/projects"><li>Projects</li></Link>
          <Link to="/forms"><li>Forms</li></Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
