import { useState } from "react";
import axios from "axios";
import "./AddCreator.css";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  MapPin,
  Calendar,
  UserPlus,
} from "lucide-react";

export default function AddCreator() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    company_name: "",
    creator_location: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCase = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/addcampaigncreator`,
        formData
      );

      if (response.status === 200) {
        setMessage(response.data);
        setError("");
        setFormData({
          name: "",
          gender: "",
          dob: "",
          email: "",
          username: "",
          password: "",
          mobileno: "",
          company_name: "",
          creator_location: "",
        });
      }
    } catch (error) {
      if (error.response) {
        setMessage("");
        setError(error.response.data);
      } else {
        setMessage("");
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="creator-page">
      <div className="creator-container">
        <div className="creator-header">
          <div className="header-icon">
            <Building2 size={32} />
          </div>
          <h1>Add Campaign Creator</h1>
          <p>Register a new campaign creator to manage campaigns</p>
        </div>

        {message && (
          <div className="alert alert-success">
            <div className="alert-content">
              <span className="alert-icon">✓</span>
              <span>{message}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <div className="alert-content">
              <span className="alert-icon">⚠</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="creator-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <User className="label-icon" size={18} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onKeyUp={handleCase}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">
                <User className="label-icon" size={18} />
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">
                <Calendar className="label-icon" size={18} />
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail className="label-icon" size={18} />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">
                <User className="label-icon" size={18} />
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock className="label-icon" size={18} />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create password"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobileno">
                <Phone className="label-icon" size={18} />
                Mobile No
              </label>
              <input
                type="number"
                id="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                required
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company_name">
                <Building2 className="label-icon" size={18} />
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="creator_location">
                <MapPin className="label-icon" size={18} />
                Creator Location
              </label>
              <input
                type="text"
                id="creator_location"
                value={formData.creator_location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Add Creator</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
