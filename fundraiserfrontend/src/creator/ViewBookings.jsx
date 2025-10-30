import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBookings.css';

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      const creatorData = JSON.parse(storedCreator);
      setCreator(creatorData);
      fetchBookings(creatorData.id);
    } else {
      setError('Creator not logged in.');
    }
  }, []);

  const fetchBookings = async (creatorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/creator/viewbookingsbycreator/${creatorId}`
      );
      setBookings(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch bookings.');
      setBookings([]);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/creator/updatebookingstatus`,
        { params: { id: bookingId, status } }
      );
      alert(response.data);
      fetchBookings(creator.id); // Refresh after update
    } catch (err) {
      alert('Failed to update booking status.');
      console.error(err);
    }
  };

  return (
    <div className="bookings-container">
      <section className="hero-section">
        <h2 className="hero-title">
          Hello, <span className="gradient-text">{creator?.name}</span>
        </h2>
        <p className="hero-subtitle">
          Manage and monitor your campaign bookings efficiently.
        </p>
      </section>

      <h3 className="page-title">📑 Bookings for My Campaigns</h3>
      {error && <p className="error-text">{error}</p>}

      {bookings.length === 0 ? (
        <p className="no-data">No bookings available for your campaigns.</p>
      ) : (
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Campaign ID</th>
                <th>Title</th>
                <th>Donor Name</th>
                <th>Donor Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Booked Capacity</th>
                <th>Status</th>
                <th>Booking Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.id}</td>
                  <td>{booking.campaign.id}</td>
                  <td>{booking.campaign.title}</td>
                  <td>{booking.donor.name}</td>
                  <td>{booking.donor.email}</td>
                  <td>{booking.startdate}</td>
                  <td>{booking.enddate}</td>
                  <td>{booking.bookedcapacity}</td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.bookingtime
                      ? new Date(booking.bookingtime).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-accept"
                        onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => updateStatus(booking.id, 'REJECTED')}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
