import { useState, useEffect } from 'react';
import { Edit3, Users, MapPin, Mail, Calendar, Smartphone, Briefcase } from 'lucide-react';
import './CreatorProfile.css';

export default function CreatorProfile() {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  if (!creator) {
    return (
      <div className="loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="creator-profile-container">
      <section className="hero-section">
        <h2 className="hero-title">Hello, <span className="gradient-text">{creator.name}</span></h2>
        <p className="hero-subtitle">Manage your profile and track your campaigns easily</p>
      </section>

      <section className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{creator.name.charAt(0)}</div>
            <div className="profile-name">
              <h3>{creator.name}</h3>
              <span>{creator.username}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-item"><Calendar size={18}/> <strong>DOB:</strong> {creator.dob}</div>
            <div className="profile-item"><Mail size={18}/> <strong>Email:</strong> {creator.email}</div>
            <div className="profile-item"><Smartphone size={18}/> <strong>Mobile:</strong> {creator.mobileno}</div>
            <div className="profile-item"><Users size={18}/> <strong>Gender:</strong> {creator.gender}</div>
            <div className="profile-item"><Briefcase size={18}/> <strong>Company:</strong> {creator.company_name}</div>
            <div className="profile-item"><MapPin size={18}/> <strong>Location:</strong> {creator.creator_location}</div>
          </div>

          <div className="profile-actions">
            <button className="btn-primary"><Edit3 size={16}/> Edit Profile</button>
          </div>
        </div>
      </section>
    </div>
  );
}
