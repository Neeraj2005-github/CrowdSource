import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavbar from "./admin/AdminNavbar";
import DonorNavBar from "./donor/DonorNavBar";
import CreatorNavBar from "./creator/CreatorNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import Home from "./main/Home.jsx";
import NotFound from "./main/NotFound.jsx";
import DonorLogin from "./donor/DonorLogin.jsx";
import DonorHome from "./donor/DonorHome.jsx";
import BookCampaign from "./donor/BookCampaign.jsx";
import BookedCampaigns from "./donor/BookedCampaigns.jsx";
import PaymentResult from "./main/PaymentResult.jsx";

function AppContent() 
{
  const { isAdminLoggedIn, isDonorLoggedIn, isCreatorLoggedIn } = useAuth();

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavbar />
        ) : isDonorLoggedIn ? (
          <DonorNavBar />
        ) : isCreatorLoggedIn ? (
          <CreatorNavBar />
        ) : (
          <MainNavBar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donorlogin" element={<DonorLogin />} />
          <Route path="/donorhome" element={<DonorHome />} />
          <Route path="/bookcampaign" element={<BookCampaign />} />
          <Route path="/bookedcampaigns" element={<BookedCampaigns />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
