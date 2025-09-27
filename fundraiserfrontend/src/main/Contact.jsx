import { useState } from "react";
import axios from "axios";
import "./Contact.css"; // new file for custom styling

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
    email: "",
    mobileno: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendemail`,
        formData
      );
      setMessage(response.data);
      setError("");

      setFormData({
        name: "",
        subject: "",
        message: "",
        email: "",
        mobileno: "",
        location: "",
      });
    } catch (err) {
      setError("Failed to send email");
      setMessage("");
      console.error(err);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>📩 Contact Us</h2>
        <p>
          Have questions or feedback? Fill out the form below and we’ll get back
          to you soon.
        </p>
      </div>

      {message && <p className="form-message success">{message}</p>}
      {error && <p className="form-message error">{error}</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="tel"
            id="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="4"
            required
          />
        </div>

        <button type="submit" className="contact-btn">
          Send Message
        </button>
      </form>
    </div>
  );
}
