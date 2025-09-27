import { useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';
import { Shield, User, Lock, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/checkadminlogin`,
        formData
      );
      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        navigate('/adminhome');
      } else {
        setMessage(response.data);
        setError('');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
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
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-header-icon">
            <Shield size={32} />
          </div>
          <h1>Admin Login</h1>
          <p>Secure access to the administration panel</p>
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

        <form onSubmit={handleSubmit} className="admin-login-form">
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
              placeholder="Enter admin username"
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
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" className="admin-login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Access Admin Panel</span>
              </>
            )}
          </button>
        </form>

        <div className="admin-security-notice">
          <p>🔒 This is a secure admin area. All login attempts are monitored.</p>
        </div>
      </div>
    </div>
  );
}