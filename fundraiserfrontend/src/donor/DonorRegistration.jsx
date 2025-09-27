import { useState } from 'react';
import axios from 'axios';
import './DonorRegistration.css';
import { User, Mail, Lock, Phone, MapPin, Calendar, UserPlus } from 'lucide-react';

export default function DonorRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/donor/registration`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          gender: '',
          dob: '',
          email: '',
          username: '',
          password: '',
          mobileno: '',
          location: ''
        });
      }
    } catch (error) {
      if (error.response) {
        setMessage('');
        setError(error.response.data);
      } else {
        setMessage('');
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-header">
          <div className="header-icon">
            <UserPlus size={32} />
          </div>
          <h1>Join CrowdSource</h1>
          <p>Create your donor account and start making a difference today</p>
        </div>

        {message && (
          <div className="alert alert-success">
            <div className="alert-content">
              <span className="alert-icon">✓</span>
              <span>{message}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <div className="alert-content">
              <span className="alert-icon">⚠</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <User className="label-icon" size={18} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">
                <User className="label-icon" size={18} />
                Gender
              </label>
              <select id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">
                <Calendar className="label-icon" size={18} />
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail className="label-icon" size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">
                <User className="label-icon" size={18} />
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock className="label-icon" size={18} />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobileno">
                <Phone className="label-icon" size={18} />
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                required
                placeholder="Enter your mobile number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                <MapPin className="label-icon" size={18} />
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter your location"
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>Already have an account? <a href="/donorlogin">Sign in here</a></p>
        </div>
      </div>
    </div>
  );
}