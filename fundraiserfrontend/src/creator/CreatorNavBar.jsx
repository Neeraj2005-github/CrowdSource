import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './CreatorNavBar.css';
import CreatorHome from './CreatorHome';
import CreatorProfile from './CreatorProfile';
import CreatorLogin from './CreatorLogin';
import { useAuth } from '../contextapi/AuthContext';
import AddCampaign from './AddCampaign';
import ViewCampaignsByCreator from './ViewCampaignsByCreator';
import ViewBookings from './ViewBookings';
import { Menu, X, User } from 'lucide-react';

export default function CreatorNavBar() {
  const { setIsCreatorLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    setIsCreatorLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="creator-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <User size={28} />
            <span className="brand-text">Creator Portal</span>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/creatorhome" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/creatorprofile" onClick={closeMobileMenu}>Profile</Link></li>
            <li><Link to="/addcampaign" onClick={closeMobileMenu}>Add Campaign</Link></li>
            <li><Link to="/viewcampaignsbycreator" onClick={closeMobileMenu}>View Campaigns</Link></li>
            <li><Link to="/viewbookings" onClick={closeMobileMenu}>View Bookings</Link></li>
            <li className="logout">
              <Link to="/" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                Logout
              </Link>
            </li>
          </ul>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/creatorhome" element={<CreatorHome />} exact />
        <Route path="/creatorprofile" element={<CreatorProfile />} exact />
        <Route path="/addcampaign" element={<AddCampaign />} exact />
        <Route path="/viewcampaignsbycreator" element={<ViewCampaignsByCreator />} exact />
        <Route path="/viewbookings" element={<ViewBookings />} exact />
        <Route path="/creatorlogin" element={<CreatorLogin />} exact />
      </Routes>
    </div>
  );
}
