import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [halls, setHalls] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      if (parsed.role === "owner") {
        axios
          .get(`http://localhost:1111/toyxonalar/owner/${parsed.userId}`)
          .then((res) => {
            setHalls(res.data);
          })
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
      <div className="home-page" style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Men qo‘shgan to‘yxonalar</h2>
          <button
            onClick={() => navigate(`/owner/bronlar/${user.userId}`)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Bron qilinganlar
          </button>
        </div>

        {halls.length === 0 ? (
          <p>Siz hali hech qanday to‘yxona qo‘shmagansiz.</p>
        ) : (
          <div className="hall-list">
            {halls.map((hall) => (
              <div
                key={hall.id}
                className="hall-card"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  maxWidth: "400px",
                }}
              >
                <h3>{hall.name}</h3>
                <p><strong>Rayon:</strong> {hall.rayon}</p>
                <p><strong>Manzil:</strong> {hall.address}</p>
                <p><strong>Status:</strong> {hall.status}</p>
                <Link
                  to={`/edit-hall/${hall.id}`}
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  Tahrirlash
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
