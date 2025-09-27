import { useState } from 'react';
import './DonorLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';
import { Heart, User, Lock, LogIn } from 'lucide-react';

export default function DonorLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsDonorLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/donor/checkdonorlogin`, formData);

      if (response.status === 200) {
        setIsDonorLoggedIn(true);
        sessionStorage.setItem('donor', JSON.stringify(response.data));
        navigate('/donorhome');
      } else {
        setMessage(response.data);
        setError('');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
        setMessage('');
      } else {
        setError('An unexpected error occurred.');
        setMessage('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donor-login-page">
      <div className="donor-login-container">
        <div className="donor-login-header">
          <div className="donor-header-icon">
            <Heart size={32} />
          </div>
          <h1>Donor Login</h1>
          <p>Welcome back! Sign in to continue making a difference</p>
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

        <form onSubmit={handleSubmit} className="donor-login-form">
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="donor-login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>Don't have an account? <a href="/donorregistration">Register here</a></p>
        </div>
      </div>
    </div>
  );
}