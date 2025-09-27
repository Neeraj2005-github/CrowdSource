import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./AdminNavbar.css";
import AdminHome from "./AdminHome";
import AddCreator from "./AddCreator";
import ViewCreators from "./ViewCreators";
import ViewDonors from "./ViewDonors";
import AdminLogin from "./AdminLogin";
import { useAuth } from "../contextapi/AuthContext";
import { Shield, Users, HeartHandshake, Home, LogOut, Menu, X } from "lucide-react";

export default function AdminNavbar() {
  const { setIsAdminLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <nav className="admin-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="brand-icon">
              <Shield size={24} />
            </div>
            <span className="brand-text">Admin Panel</span>
          </div>

          <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <Link to="/adminhome" className="nav-item" onClick={closeMobileMenu}>
              <Home size={16} />
              Home
            </Link>
            <Link
              to="/addcampaigncreator"
              className="nav-item"
              onClick={closeMobileMenu}
            >
              <Users size={16} />
              Add Campaign Creators
            </Link>
            <Link
              to="/viewcreators"
              className="nav-item"
              onClick={closeMobileMenu}
            >
              <Users size={16} />
              View Campaign Creators
            </Link>
            <Link
              to="/viewalldonors"
              className="nav-item"
              onClick={closeMobileMenu}
            >
              <HeartHandshake size={16} />
              View Donors
            </Link>
            <Link
              to="/adminlogin"
              className="nav-item nav-logout"
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
            >
              <LogOut size={16} />
              Logout
            </Link>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addcampaigncreator" element={<AddCreator />} exact />
        <Route path="/viewcreators" element={<ViewCreators />} exact />
        <Route path="/viewalldonors" element={<ViewDonors />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}
