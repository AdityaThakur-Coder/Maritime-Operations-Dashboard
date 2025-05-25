import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Anchor, Menu, X, BarChart, Ship, LogOut, User } from 'lucide-react';
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-logo">
            <Anchor className="icon" />
            <span className="logo-text">Maritime Operations</span>
          </Link>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" className="navbar-item" onClick={toggleMobileMenu}>
            <BarChart className="icon" />
            Dashboard
          </Link>
          <Link to="/ship/search" className="navbar-item" onClick={toggleMobileMenu}>
            <Ship className="icon" />
            Ship Search
          </Link>
        </div>

        <div className="navbar-right">
          <div className="user-info">
            <User className="icon" />
            <span>{user?.name || 'User'}</span>
          </div>
          <button className="btn-logout" onClick={() => { handleLogout(); toggleMobileMenu(); }}>
            <LogOut className="icon" />
            Logout
          </button>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className="mobile-menu-item" onClick={toggleMobileMenu}>
            <BarChart className="icon" />
            Dashboard
          </Link>
          <Link to="/ship/search" className="mobile-menu-item" onClick={toggleMobileMenu}>
            <Ship className="icon" />
            Ship Search
          </Link>
          <div className="mobile-user-info">
            <User className="icon" />
            {user?.name || 'User'}
          </div>
          <button className="mobile-logout-btn" onClick={() => { handleLogout(); toggleMobileMenu(); }}>
            <LogOut className="icon" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
