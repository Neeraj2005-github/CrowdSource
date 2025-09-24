import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminHome() {
  const [donorCount, setDonorCount] = useState(0);
  const [creatorCount, setCreatorCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const donorRes = await axios.get(`${import.meta.env.VITE_API_URL}/admin/donorcount`);
        const creatorRes = await axios.get(`${import.meta.env.VITE_API_URL}/admin/creatorcount`);
        const campaignRes = await axios.get(`${import.meta.env.VITE_API_URL}/admin/campaigncount`);

        setDonorCount(donorRes.data);
        setCreatorCount(creatorRes.data);
        setCampaignCount(campaignRes.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2>Welcome to Admin Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Donors</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>{donorCount}</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Creators</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{creatorCount}</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Campaigns</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff5722' }}>{campaignCount}</p>
        </div>
      </div>
    </div>
  );
}
