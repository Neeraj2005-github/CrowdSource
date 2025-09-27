import './Home.css';
import { ArrowRight, Play, Users, Shield, TrendingUp, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Star className="badge-icon" size={16} />
              <span>Make an Impact Today</span>
            </div>
            <h1 className="hero-title">
              Connect, Fund, and 
              <span className="gradient-text"> Transform Lives</span>
            </h1>
            <p className="hero-description">
              Create powerful campaigns for personal, social, or business causes. Set ambitious goals, 
              share compelling stories, and track contributions effortlessly. Join thousands of donors 
              who browse campaigns, give securely, and follow progress in real-time.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                <span>Start Your Campaign</span>
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-avatar"></div>
                <div className="card-info">
                  <h4>Education for All</h4>
                  <p>by Sarah Johnson</p>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-stats">
                  <span className="raised">$12,450 raised</span>
                  <span className="goal">of $15,000</span>
                </div>
              </div>
              <div className="supporters">
                <div className="supporter-avatars">
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar-count">+47</div>
                </div>
                <span>supporters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose CrowdSource?</h2>
            <p>Everything you need to run successful fundraising campaigns</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Community Driven</h3>
              <p>Connect with a passionate community of donors and supporters who believe in making a difference.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure & Trusted</h3>
              <p>Bank-level security with transparent tracking and reporting of all contributions and transactions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Real-time Analytics</h3>
              <p>Track your campaign performance with detailed analytics and insights to optimize your fundraising.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">$2.5M+</div>
              <div className="stat-label">Funds Raised</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Campaigns</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Donors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}