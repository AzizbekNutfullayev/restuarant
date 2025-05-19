import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [halls, setHalls] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("admin") || localStorage.getItem("user");
    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    axios.get("http://localhost:1111/toyxonalar")
      .then((res) => setHalls(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  const handleBron = (id) => {
    alert(`Bron qilish sahifasiga yo'naltiriladi (Hall ID: ${id})`);
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h2>Barcha To‘yxonalar</h2>
        <div className="hall-list">
          {halls.map((hall) => (
            <div className="hall-card" key={hall.id}>
              <h3>{hall.name}</h3>
              <p><strong>Rayon:</strong> {hall.rayon}</p>
              <p><strong>Manzil:</strong> {hall.address}</p>
              <p><strong>Narx:</strong> ${hall.seat_price}</p>
              <p><strong>Sig‘im:</strong> {hall.seat_count}</p>
              <p><strong>Telefon:</strong> {hall.phone}</p>
              {user?.role === "user" && (
                <button onClick={() => handleBron(hall.id)}>
                  Bron qilish
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
