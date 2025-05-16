import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/toyxonalar")
      .then((res) => setHalls(res.data))
      .catch((err) => {
        console.error("To‘yxonalarni olishda xatolik:", err);
        setError("Ma'lumotlarni olishda xatolik yuz berdi");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>Tasdiqlangan To‘yxonalar</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="hall-list">
          {halls.map((hall) => (
            <div className="hall-card" key={hall.id}>
              <img
                src={
                  hall.image ||
                  "https://via.placeholder.com/100x80?text=Image"
                }
                alt={hall.name}
              />
              <div>
                <h3>{hall.name}</h3>
                <p>Rayon: {hall.rayon}</p>
                <p>Manzil: {hall.address}</p>
                <p>Narx: ${hall.seat_price}</p>
                <p>Sig‘im: {hall.seat_count} kishi</p>
              </div>
              <Link to={`/hall/${hall.id}`}>
                <button>{user ? "Ko‘rish" : "Login kerak"}</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
