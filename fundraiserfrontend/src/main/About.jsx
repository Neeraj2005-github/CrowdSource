import './About.css';
import { Heart, Shield, Users, TrendingUp, Globe, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About CrowdSource</h1>
            <p className="hero-subtitle">
              Empowering dreams, one campaign at a time. We're building the future of 
              community-driven fundraising with transparency, security, and impact at our core.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                CrowdSource is a revolutionary platform that empowers individuals and organizations 
                to create meaningful fundraising campaigns for personal, social, or business causes. 
                We believe that every great idea deserves a chance to flourish, and every cause 
                deserves support from a caring community.
              </p>
              <p>
                Our mission is to make fundraising transparent, simple, and accessible for everyone, 
                connecting passionate campaign creators with generous donors through a reliable, 
                secure digital platform that celebrates every achievement along the way.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-card">
                <Heart className="mission-icon" size={48} />
                <h3>Making Impact Accessible</h3>
                <p>Democratizing fundraising for causes that matter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Why Choose CrowdSource?</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Shield size={28} />
              </div>
              <h3>Transparent Tracking</h3>
              <p>Complete transparency with detailed reporting of all contributions, ensuring donors know exactly how their money is being used.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={28} />
              </div>
              <h3>Secure & Easy Process</h3>
              <p>Bank-level security combined with an intuitive donation process that makes giving simple and safe for everyone.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Globe size={28} />
              </div>
              <h3>Global Reach</h3>
              <p>Support for personal, social, and business campaigns from around the world, connecting causes with supporters globally.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Star size={28} />
              </div>
              <h3>Success Stories</h3>
              <p>Inspiring success stories that celebrate every achievement and milestone, motivating both creators and donors.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <TrendingUp size={28} />
              </div>
              <h3>Real-time Analytics</h3>
              <p>Comprehensive analytics and insights help campaign creators optimize their fundraising strategies for maximum impact.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart size={28} />
              </div>
              <h3>Community Support</h3>
              <p>A vibrant community of supporters who believe in making a difference and supporting meaningful causes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="impact-content">
            <h2>Our Impact</h2>
            <p>
              Since our launch, we've helped thousands of campaigns reach their goals, 
              connecting passionate creators with generous supporters worldwide.
            </p>
            <div className="impact-stats">
              <div className="impact-stat">
                <div className="stat-number">$2.5M+</div>
                <div className="stat-label">Total Funds Raised</div>
              </div>
              <div className="impact-stat">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Successful Campaigns</div>
              </div>
              <div className="impact-stat">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Active Donors</div>
              </div>
              <div className="impact-stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}