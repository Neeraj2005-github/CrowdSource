import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAllCampaigns.css';

export default function ViewAllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    creator: '',
    company: '',
    category: '',
    title: '',
    description: '',
    goal: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/donor/viewallcampaigns`);
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleBookClick = (campaignId) => {
    const donor = JSON.parse(sessionStorage.getItem("donor"));
    if (!donor || !donor.id) {
      alert("Donor not logged in");
      return;
    }
    navigate(`/bookcampaign?campaignid=${campaignId}`);
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    return (
      campaign.id.toString().includes(searchTerms.id) &&
      campaign.creator.name.toLowerCase().includes(searchTerms.creator.toLowerCase()) &&
      campaign.creator.company_name.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      campaign.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      campaign.title.toLowerCase().includes(searchTerms.title.toLowerCase()) &&
      campaign.description.toLowerCase().includes(searchTerms.description.toLowerCase()) &&
      campaign.goal.toString().includes(searchTerms.goal)
    );
  });

  return (
    <div className="campaigns-container">
      <h2 className="campaigns-title">Available Campaigns</h2>

      {filteredCampaigns.length === 0 ? (
        <p className="empty-message">No matching campaigns found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="campaigns-table">
            <thead>
              <tr>
                <th>Campaign ID</th>
                <th>Creator Company</th>
                <th>Creator Location</th>
                <th>Category</th>
                <th>Title</th>
                <th>Description</th>
                <th>Goal</th>
                <th>Action</th>
              </tr>
              <tr>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'id')} /></th>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'creator')} /></th>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'company')} /></th>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'category')} /></th>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'title')} /></th>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'description')} /></th>
                <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'goal')} /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>{campaign.creator.company_name}</td>
                  <td>{campaign.creator.creator_location}</td>
                  <td>{campaign.category}</td>
                  <td>{campaign.title}</td>
                  <td>{campaign.description}</td>
                  <td>{campaign.goal}</td>
                  <td>
                    <button className="book-button" onClick={() => handleBookClick(campaign.id)}>Book</button>
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
