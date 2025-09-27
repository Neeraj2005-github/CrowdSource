import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import About from './About';
import './MainNavBar.css';
import DonorLogin from './../donor/DonorLogin';
import DonorRegistration from './../donor/DonorRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import CreatorLogin from '../creator/CreatorLogin';
import NotFound from './NotFound';
import { Heart, User, Shield, Menu, X, ChevronDown } from 'lucide-react';

export default function MainNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <nav className="modern-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="brand-icon">
              <Heart size={24} />
            </div>
            <span className="brand-text">CrowdSource</span>
          </div>
          
          <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-item" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/about" className="nav-item" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/donorregistration" className="nav-item nav-register" onClick={closeMobileMenu}>
              Get Started
            </Link>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <span className="nav-item dropdown-trigger">
                Login
                <ChevronDown size={16} className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
              </span>
              <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <Link to="/donorlogin" className="dropdown-item" onClick={closeMobileMenu}>
                  <Heart size={16} className="dropdown-icon" />
                  <span>Donor Portal</span>
                </Link>
                <Link to="/creatorlogin" className="dropdown-item" onClick={closeMobileMenu}>
                  <User size={16} className="dropdown-icon" />
                  <span>Creator Hub</span>
                </Link>
                <Link to="/adminlogin" className="dropdown-item" onClick={closeMobileMenu}>
                  <Shield size={16} className="dropdown-icon" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>
            
            <Link to="/contact" className="nav-item nav-contact" onClick={closeMobileMenu}>
              Contact
            </Link>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/donorregistration" element={<DonorRegistration />} exact />
        <Route path="/donorlogin" element={<DonorLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/creatorlogin" element={<CreatorLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}