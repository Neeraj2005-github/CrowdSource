import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookCampaign.css';

export default function BookCampaign() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get('campaignid');

  const [donor, setDonor] = useState(null);
  const [formData, setFormData] = useState({
    bookedcapacity: 1
  });

  // Automatically take current date (local)
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const storedDonor = sessionStorage.getItem("donor");
    if (storedDonor) {
      setDonor(JSON.parse(storedDonor));
    } else {
      alert("Donor not logged in!");
      navigate('/donorlogin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send current date automatically
    const bookingData = {
      campaign: { id: campaignId },
      donor: { id: donor.id },
      startdate: currentDate,     // backend non-null safety
      enddate: currentDate,       // same date as start
      bookedcapacity: formData.bookedcapacity,
      status: 1
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/donor/bookcampaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert("Campaign booked successfully!");
        navigate('/bookedcampaigns');
      } else {
        alert("Failed to book campaign.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!donor) {
    return <p className="loading-message">Loading donor info...</p>;
  }

  return (
    <div className="book-campaign-container">
      <div className="book-campaign-card">
        <h2 className="book-campaign-title">Book Campaign</h2>
        <form onSubmit={handleSubmit} className="book-campaign-form">
          <div className="form-group">
            <label>Current Date</label>
            <input type="text" value={currentDate} readOnly className="readonly-input" />
          </div>

          <div className="form-group">
            <label>Donating Amount</label>
            <input
              type="number"
              name="bookedcapacity"
              min="1"
              value={formData.bookedcapacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}
