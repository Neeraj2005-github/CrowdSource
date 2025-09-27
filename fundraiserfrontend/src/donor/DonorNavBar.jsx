import { Routes, Route, Link } from 'react-router-dom';
import './DonorNavBar.css';
import DonorHome from './DonorHome';
import DonorProfile from './DonorProfile';
import DonorLogin from './DonorLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import BookedCampaigns from './BookedCampaigns';
import ViewAllCampaigns from './ViewAllCampaigns';
import BookCampaign from './BookCampaign';
import { Menu, X, Heart, User, LogOut, ClipboardList, Home, Edit } from 'lucide-react';
import { useState } from 'react';

export default function DonorNavBar() {
  const { setIsDonorLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    setIsDonorLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="donor-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Heart size={26} />
            <span className="brand-text">Donor Portal</span>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/donorhome" onClick={closeMobileMenu}><Home size={18}/> Home</Link></li>
            <li><Link to="/donorprofile" onClick={closeMobileMenu}><User size={18}/> Profile</Link></li>
            <li><Link to="/updateprofile" onClick={closeMobileMenu}><Edit size={18}/> Update</Link></li>
            <li><Link to="/viewallcampaigns" onClick={closeMobileMenu}><ClipboardList size={18}/> Book Campaign</Link></li>
            <li><Link to="/bookedcampaigns" onClick={closeMobileMenu}><Heart size={18}/> My Bookings</Link></li>
            <li className="logout">
              <Link to="/" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                <LogOut size={18}/> Logout
              </Link>
            </li>
          </ul>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/donorhome" element={<DonorHome />} exact />
        <Route path="/donorprofile" element={<DonorProfile />} exact />
        <Route path="/updateprofile" element={<UpdateProfile />} exact />
        <Route path="/viewallcampaigns" element={<ViewAllCampaigns />} exact />
        <Route path="/bookcampaign" element={<BookCampaign />} />
        <Route path="/bookedcampaigns" element={<BookedCampaigns />} exact />
        <Route path="/donorlogin" element={<DonorLogin />} exact />
      </Routes>
    </div>
  );
}
