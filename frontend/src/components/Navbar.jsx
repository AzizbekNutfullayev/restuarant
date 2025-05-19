import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Bosh sahifa</Link>

        {/* 🔵 Owner uchun */}
        {user?.role === "owner" && <Link to="/add-hall">To‘yxona qo‘shish</Link>}

        {/* 🔵 Admin uchun */}
        {user?.role === "admin" && <Link to="/admin/add-hall">To‘yxona qo‘shish</Link>}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>{user.username} | <strong>{user.role}</strong></span>
            <button onClick={handleLogout}>Chiqish</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
