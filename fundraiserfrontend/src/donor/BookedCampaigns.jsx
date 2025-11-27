import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookedCampaigns.css';

export default function BookedCampaigns() {
  const navigate = useNavigate();
  const [bookedCampaigns, setBookedCampaigns] = useState([]);
  const [donor, setDonor] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookedCampaigns = async () => {
    const storedDonor = sessionStorage.getItem('donor');
    if (storedDonor) {
      const donorData = JSON.parse(storedDonor);
      setDonor(donorData);
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/donor/bookedcampaigns/${donorData.id}`
        );
        setBookedCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching booked campaigns:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please log in to view your booked campaigns.');
    }
  };

  useEffect(() => {
    fetchBookedCampaigns();
  }, []);

  const startPayment = async (booking) => {
    try {
      setPayingId(booking.id);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/payments/create-order`, {
        bookingId: booking.id,
        currency: 'INR',
      });
      const { keyId, orderId, amount, currency, mock } = res.data;

      if (mock) {
        alert('Payment is in mock mode. Configure real Razorpay keys to enable live checkout.');
        // Refresh so the mock orderId appears; keep status pending until webhook marks paid
        setTimeout(() => fetchBookedCampaigns(), 300);
        setPayingId(null);
        return;
      }

      const options = {
        key: keyId,
        amount: amount.toString(),
        currency,
        name: 'FundRaiser',
        description: `Donation for ${booking.campaign?.title || 'Campaign'}`,
        order_id: orderId,
        prefill: {
          name: donor?.name || 'Donor',
          email: donor?.email || '',
          contact: donor?.mobileno || '',
        },
        notes: { booking_id: String(booking.id) },
        theme: { color: '#3399cc' },
        handler: function (response) {
          // response.razorpay_payment_id is present on success.
          setTimeout(() => fetchBookedCampaigns(), 500);
          navigate(`/payment-result?status=success&bookingId=${booking.id}`);
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed', response?.error);
        alert('Payment failed. Please try again.');
        setTimeout(() => fetchBookedCampaigns(), 500);
        navigate(`/payment-result?status=failed&bookingId=${booking.id}`);
      });
      rzp.open();
    } catch (e) {
      console.error('Payment error', e);
      alert('Unable to start payment: ' + (e?.response?.data || e.message));
    } finally {
      setPayingId(null);
    }
  };

  if (!donor) {
    return <p className="loading-message">Loading donor details...</p>;
  }

  return (
    <div className="booked-campaigns-container">
      <section className="hero-section">
        <h2 className="hero-title">
          Hello, <span className="gradient-text">{donor.name}</span>
        </h2>
        <p className="hero-subtitle">
          Here’s a summary of all your booked campaigns and donations.
        </p>
        <button className="btn-refresh" onClick={fetchBookedCampaigns} disabled={loading} style={{marginTop: 12}}>
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </section>

      <h3 className="booked-campaigns-title">Your Booked Campaigns</h3>

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
                <th>Booked Capacity</th>
                <th>Status</th>
                <th>Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {bookedCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.campaign?.category}</td>
                  <td>{campaign.campaign?.title}</td>
                  <td>{campaign.bookedcapacity}</td>
                  <td>
                    {campaign.status}
                    {campaign.status === 'APPROVED' && (
                      <button
                        className="pay-btn"
                        style={{ marginLeft: 8 }}
                        disabled={payingId === campaign.id}
                        onClick={() => startPayment(campaign)}
                      >
                        {payingId === campaign.id ? 'Starting...' : 'Pay Now'}
                      </button>
                    )}
                  </td>
                  <td>
                    {campaign.bookingtime
                      ? new Date(campaign.bookingtime).toLocaleString()
                      : 'N/A'}
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
