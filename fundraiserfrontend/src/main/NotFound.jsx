import { Link } from "react-router-dom";
import NotFoundImage from "./notfound.png";
import "./NotFound.css";

export default function PageNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src={NotFoundImage}
          alt="Page Not Found"
          className="not-found-image"
        />
        <h1 className="not-found-title">Oops! Page Not Found</h1>
        <p className="not-found-subtitle">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="home-btn">
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
}
