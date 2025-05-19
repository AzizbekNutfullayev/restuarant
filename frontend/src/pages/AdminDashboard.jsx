import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState("");

  const fetchHalls = () => {
    axios.get("http://localhost:1111/admin/toyxonalar")
      .then(res => setHalls(res.data.data || []))
      .catch(err => {
        console.error("Xatolik:", err);
        setError("Toyxonalarni olishda xatolik");
      });
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleApprove = (id) => {
    axios.patch(`http://localhost:1111/admin/toyxonalar/${id}/approve`)
      .then(() => fetchHalls())
      .catch(err => {
        console.error("Tasdiqlash xatoligi:", err);
        alert("Tasdiqlashda xatolik");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu toyxonani ochirishga ishonchingiz komilmi?")) {
      axios.delete(`http://localhost:1111/admin/toyxonalar/${id}`)
        .then(() => fetchHalls())
        .catch(err => {
          console.error("Ochirish xatoligi:", err);
          alert("chirishda xatolik");
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h2>Admin Panel — Barcha Toyxonalar</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {halls.length === 0 ? (
          <p>Hozircha toyxona mavjud emas</p>
        ) : (
          <div className="hall-list">
            {halls.map((hall) => (
              <div className="hall-card" key={hall.id}>
                <h3>{hall.name}</h3>
                <p><strong>Rayon:</strong> {hall.rayon}</p>
                <p><strong>Manzil:</strong> {hall.address}</p>
                <p><strong>Narx:</strong> ${hall.seat_price}</p>
                <p><strong>Sigim:</strong> {hall.seat_count}</p>
                <p><strong>Status:</strong> {hall.status}</p>
                <p><strong>Egasining ismi:</strong> {hall.owner_firstname} {hall.owner_lastname}</p>

                {hall.status === "tasdiqlanmagan" && (
                  <button onClick={() => handleApprove(hall.id)}>Tasdiqlash</button>
                )}
                <button
                  onClick={() => handleDelete(hall.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Ochirish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
