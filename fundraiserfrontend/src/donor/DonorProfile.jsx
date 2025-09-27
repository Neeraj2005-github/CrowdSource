import { useState, useEffect } from 'react';
import { Users, MapPin, Mail, Calendar, Smartphone } from 'lucide-react';
import './DonorProfile.css';

export default function DonorProfile() {
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) {
      setDonor(JSON.parse(storedDonor));
    }
  }, []);

  if (!donor) {
    return (
      <div className="loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="donor-profile-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">Hello, <span className="gradient-text">{donor.name}</span></h2>
        <p className="hero-subtitle">Your profile and donation journey at a glance</p>
      </section>

      {/* Profile Card */}
      <section className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{donor.name.charAt(0)}</div>
            <div className="profile-name">
              <h3>{donor.name}</h3>
              <span>{donor.username}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-item"><Calendar size={18}/> <strong>DOB:</strong> {donor.dob}</div>
            <div className="profile-item"><Mail size={18}/> <strong>Email:</strong> {donor.email}</div>
            <div className="profile-item"><Smartphone size={18}/> <strong>Mobile:</strong> {donor.mobileno}</div>
            <div className="profile-item"><Users size={18}/> <strong>Gender:</strong> {donor.gender}</div>
            <div className="profile-item"><MapPin size={18}/> <strong>Location:</strong> {donor.location}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
