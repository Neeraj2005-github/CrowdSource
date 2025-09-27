import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewCampaignsByCreator.css';

export default function ViewCampaignsByCreator() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [creatorId, setCreatorId] = useState(null);

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      const creator = JSON.parse(storedCreator);
      setCreatorId(creator.id);
      fetchCampaigns(creator.id);
    }
  }, []);

  const fetchCampaigns = async (creatorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/creator/viewcampaignsbycreator/${creatorId}`
      );
      setCampaigns(response.data);
      setError('');
    } catch (err) {
      setError('⚠️ Failed to fetch your campaigns');
      setCampaigns([]);
    }
  };

  return (
    <div className="campaigns-container">
      <h2 className="campaigns-title">My Campaigns</h2>

      {error && <p className="error-message">{error}</p>}

      {campaigns.length === 0 ? (
        <p className="empty-message">No campaigns added yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="campaigns-table">
            <thead>
              <tr>
                <th>Campaign ID</th>
                <th>Category</th>
                <th>Title</th>
                <th>Description</th>
                <th>Required Amount($)</th>
                <th>Creator Name</th>
                <th>Creator Email</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.category}</td>
                  <td>{campaign.title}</td>
                  <td>{campaign.description}</td>
                  <td>{campaign.goal}</td>
                  <td>{campaign.creator?.name}</td>
                  <td>{campaign.creator?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
