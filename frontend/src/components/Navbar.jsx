import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Bosh sahifa</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user?.role === "admin" && (
  <Link to="/admin/add-hall">To‘yxona Qo‘shish</Link>
)}


      {user && (
        <>
          <span>
            {user.username} ({user.role})
          </span>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          {user.role === "owner" && <Link to="/add-hall">Add Hall</Link>}
          {user.role === "user" && (
            <Link to="/my-bookings">Mening bronlarim</Link>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
