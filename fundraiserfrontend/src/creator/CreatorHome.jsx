import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreatorHome.css';

export default function CreatorHome() {
  const [creator, setCreator] = useState({ name: '' });

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  return (
    <div className="creator-home-container">

      {/* Hero / Welcome Section */}
      <section className="hero-section">
        <div className="welcome-card">
          <h3 className="welcome-title">
            Welcome Back, <span className="gradient-text">{creator.name}</span>!
          </h3>
          <p className="welcome-subtitle">
            Manage your campaigns, track bookings, and engage with your supporters seamlessly.
          </p>
          <div className="hero-buttons">
            <Link to="/addcampaign" className="btn-primary">Add New Campaign</Link>
            <Link to="/viewcampaignsbycreator" className="btn-secondary">View Campaigns</Link>
            <Link to="/creatorprofile" className="btn-secondary">Manage Profile</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">12</div>
            <div className="stat-label">Campaigns Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">420</div>
            <div className="stat-label">Bookings Received</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$85,000</div>
            <div className="stat-label">Funds Raised</div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <div className="tips-container">
          <h2 className="tips-title">Tips to Run Successful Campaigns</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Engage Supporters</h3>
              <p>Tell compelling stories to inspire donors and keep them updated on your progress.</p>
            </div>
            <div className="tip-card">
              <h3>Set Realistic Goals</h3>
              <p>Define achievable fundraising targets to build trust and credibility.</p>
            </div>
            <div className="tip-card">
              <h3>Track Performance</h3>
              <p>Monitor campaign analytics to understand donor behavior and optimize results.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
