import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCampaign.css';

export default function AddCampaign() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    goal: ''
  });

  const [creator, setCreator] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaignData = {
      ...formData,
      creator_id: creator.id
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/creator/addcampaign`,
        campaignData
      );
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          category: '',
          title: '',
          description: '',
          goal: ''
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="add-campaign-container">
      <div className="form-card">
        <h3 className="form-title">Add New Campaign</h3>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="goal">Required Donation Amount ($)</label>
            <input type="number" step="0.01" id="goal" value={formData.goal} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-submit">Add Campaign</button>
        </form>
      </div>
    </div>
  );
}
