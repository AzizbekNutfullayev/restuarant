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
import "./App.css";
import Register from "./pages/Register";

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
          <Route path="/add-hall" element={<AddHall />} />
          <Route path="/all-bookings" element={<AllBookings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
