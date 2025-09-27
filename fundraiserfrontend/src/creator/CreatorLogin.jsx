import { useState } from 'react';
import './CreatorLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';
import { User, Lock, LogIn, Briefcase } from 'lucide-react';

export default function CreatorLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsCreatorLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/creator/checkcreatorlogin`,
        formData
      );
      if (response.status === 200) {
        setIsCreatorLoggedIn(true);
        sessionStorage.setItem('creator', JSON.stringify(response.data));
        navigate('/creatorhome');
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
    <div className="creator-login-page">
      <div className="creator-login-container">
        <div className="creator-login-header">
          <div className="creator-header-icon">
            <Briefcase size={32} />
          </div>
          <h1>Creator Login</h1>
          <p>Access your campaign dashboard and start creating impact</p>
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

        <form onSubmit={handleSubmit} className="creator-login-form">
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

          <button type="submit" className="creator-login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Access Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>Ready to create your first campaign? <a href="/creatorregistration">Get started</a></p>
        </div>
      </div>
    </div>
  );
}