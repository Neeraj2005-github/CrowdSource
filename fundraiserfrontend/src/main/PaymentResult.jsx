import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const status = params.get('status') || 'unknown';
  const bookingId = params.get('bookingId');

  return (
    <div style={{ padding: 24 }}>
      <h2>Payment {status === 'success' ? 'Successful' : status === 'failed' ? 'Failed' : 'Status'}</h2>
      {bookingId && <p>Booking ID: {bookingId}</p>}
      <p>
        {status === 'success'
          ? 'Thank you! Your donation is confirmed. You can view it in your booked campaigns.'
          : status === 'failed'
          ? 'Payment was not completed. You can retry from your booked campaigns.'
          : 'Return to your booked campaigns to view the current status.'}
      </p>
      <button onClick={() => navigate('/bookedcampaigns')}>
        Go to Booked Campaigns
      </button>
    </div>
  );
}
