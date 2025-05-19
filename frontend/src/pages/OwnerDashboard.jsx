import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  const [halls, setHalls] = useState([]);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      if (parsed.role === "owner") {
        axios
          .get(`http://localhost:1111/toyxonalar/owner/${parsed.userId}`)
          .then((res) => setHalls(res.data))
          .catch((err) => console.error("Xatolik:", err));
      }
    }
  }, []);

  if (!user || user.role !== "owner") {
    return <div className="login-container">Faqat ownerlar uchun sahifa</div>;
  }

  

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h2>Men qoshgan toyxonalar</h2>
        {halls.length === 0 ? (
          <p>Siz hali hech qanday toyxona qoshmagansiz.</p>
        ) : (
          <div className="hall-list">
            {halls.map((hall) => (
              <div className="hall-card" key={hall.id}>
                <h3>{hall.name}</h3>
                <p><strong>Rayon:</strong> {hall.rayon}</p>
                <p><strong>Manzil:</strong> {hall.address}</p>
                <p><strong>Status:</strong> {hall.status}</p>
                <Link to={`/edit-hall/${hall.id}`}>Tahrirlash</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
