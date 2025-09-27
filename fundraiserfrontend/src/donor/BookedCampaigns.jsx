import { useState, useEffect } from 'react';
import axios from 'axios';
import './BookedCampaigns.css';

export default function BookedCampaigns() {
  const [bookedCampaigns, setBookedCampaigns] = useState([]);
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const fetchBookedCampaigns = async () => {
      const storedDonor = sessionStorage.getItem('donor');
      if (storedDonor) {
        const donorData = JSON.parse(storedDonor);
        setDonor(donorData);
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/donor/bookedcampaigns/${donorData.id}`);
          setBookedCampaigns(response.data);
        } catch (error) {
          console.error('Error fetching booked campaigns:', error);
        }
      } else {
        alert('Please log in to view your booked campaigns.');
      }
    };
    fetchBookedCampaigns();
  }, []);

  if (!donor) {
    return <p className="loading-message">Loading donor details...</p>;
  }

  return (
    <div className="booked-campaigns-container">
      <h2 className="booked-campaigns-title">Your Booked Campaigns</h2>

      {bookedCampaigns.length === 0 ? (
        <p className="empty-message">No booked campaigns found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="booked-campaigns-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Category</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Booked Capacity</th>
                <th>Status</th>
                <th>Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {bookedCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.campaign.category}</td>
                  <td>{campaign.campaign.title}</td>
                  <td>{campaign.startdate}</td>
                  <td>{campaign.enddate}</td>
                  <td>{campaign.bookedcapacity}</td>
                  <td>{campaign.status}</td>
                  <td>{new Date(campaign.bookingtime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
