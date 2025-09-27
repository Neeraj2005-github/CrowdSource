import { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProfile.css';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
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

  useEffect(() => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) {
      setFormData(JSON.parse(storedDonor));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/donor/updateprofile`,
        formData
      );
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('donor', JSON.stringify(formData));
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="update-profile-container">
      <h3 className="update-profile-title">Update Profile</h3>
      {message ? (
        <p className="success-message">{message}</p>
      ) : (
        error && <p className="error-message">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required disabled>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required disabled />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mobile No</label>
          <input type="number" id="mobileno" value={formData.mobileno} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
}
