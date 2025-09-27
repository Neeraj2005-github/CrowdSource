import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DonorHome.css';

export default function DonorHome() {
  const [donor, setDonor] = useState({ name: '' });

  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) {
      setDonor(JSON.parse(storedDonor));
    }
  }, []);

  return (
    <div className="donor-home-container">

      {/* Hero / Welcome Section */}
      <section className="hero-section">
        <div className="welcome-card">
          <h3 className="welcome-title">
            Welcome, <span className="gradient-text">{donor.name}</span>!
          </h3>
          <p className="welcome-subtitle">
            Discover campaigns, support meaningful causes, and track your contributions.
          </p>
          <div className="hero-buttons">
            <Link to="/viewallcampaigns" className="btn-primary">Explore Campaigns</Link>
            <Link to="/bookedcampaigns" className="btn-secondary">My Bookings</Link>
            <Link to="/donorprofile" className="btn-secondary">Manage Profile</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">15</div>
            <div className="stat-label">Campaigns Supported</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$12,500</div>
            <div className="stat-label">Total Contributions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8</div>
            <div className="stat-label">Active Bookings</div>
          </div>
        </div>
      </section>

      {/* Knowledge / Tips Section */}
      <section className="tips-section">
        <div className="tips-container">
          <h2 className="tips-title">Make the Most of Your Donations</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Choose Impactful Campaigns</h3>
              <p>Look for campaigns that align with your values and demonstrate transparency in fund usage.</p>
            </div>
            <div className="tip-card">
              <h3>Track Your Giving</h3>
              <p>Regularly monitor your contributions to see the difference you’re making in the community.</p>
            </div>
            <div className="tip-card">
              <h3>Stay Engaged</h3>
              <p>Follow up with campaign updates and share them with friends to expand the impact.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
