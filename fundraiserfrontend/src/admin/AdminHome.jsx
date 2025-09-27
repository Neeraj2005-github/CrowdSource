import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminHome.css";
import { Users, Briefcase, HandCoins } from "lucide-react";

export default function AdminHome() {
  const [donorCount, setDonorCount] = useState(0);
  const [creatorCount, setCreatorCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const donorRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/donorcount`
        );
        const creatorRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/creatorcount`
        );
        const campaignRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/campaigncount`
        );

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
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Welcome to Admin Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card donors">
          <Users size={32} />
          <h3>Donors</h3>
          <p>{donorCount}</p>
        </div>
        <div className="dashboard-card creators">
          <Briefcase size={32} />
          <h3>Creators</h3>
          <p>{creatorCount}</p>
        </div>
        <div className="dashboard-card campaigns">
          <HandCoins size={32} />
          <h3>Campaigns</h3>
          <p>{campaignCount}</p>
        </div>
      </div>
    </div>
  );
}
