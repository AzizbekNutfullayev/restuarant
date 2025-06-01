import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HallDetails from "./pages/HallDetails";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddHall from "./pages/AddHall";
import UserProfile from "./pages/UserProfile";
import AllBookings from "./pages/AllBookings";
import Register from "./pages/Register";
import AdminAddHall from "./pages/AdminHall";
import EditHall from "./pages/EditHall";
import BronPage from "./pages/BronPage";
import AdminBronlar from "./pages/AdminBronlar";
import OwnerBronlar from "./pages/OwnerBronlar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hall/:id" element={<HallDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/bronlar" element={<AdminBronlar />} />
          <Route path="/owner/bronlar/:owner_id" element={<OwnerBronlar />} />
          <Route path="/add-hall" element={<AddHall />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/admin/add-hall" element={<AdminAddHall />} />
          <Route path="/bron/:id" element={<BronPage />} />
          <Route path="/edit-hall/:id" element={<EditHall />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;