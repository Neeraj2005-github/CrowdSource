import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AddCreator from './AddCreator';
import ViewCreators from './ViewCreators';
import ViewDonors from './ViewDonors';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminNavbar() 
{
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsAdminLoggedIn(false); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addcampaigncreator">Add Campaign Creators</Link></li>
          <li><Link to="/viewcreators">View Campaign Creators</Link></li>
          <li><Link to="/viewalldonors">View All Donors</Link></li>

          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addcampaigncreator" element={<AddCreator />} exact />
        <Route path="/viewcreators" element={<ViewCreators />} exact />
        <Route path="/viewalldonors" element={<ViewDonors />} exact />

        <Route path="/adminlogin" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}
