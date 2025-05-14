import { useEffect, useState } from "react";
import { mockHalls } from "../services/fakeData";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { user } = useAuth();
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    // Hozircha backend o‘rniga mock data ishlatyapmiz
    setHalls(mockHalls);
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>To'yxonalar</h1>

        <div className="filter-bar">
          <select><option>Rayon</option></select>
          <select><option>Sig'im</option></select>
          <select><option>Narx</option></select>
          <button>Qidirish</button>
        </div>

        <div className="hall-list">
          {halls.map((hall) => (
            <div className="hall-card" key={hall.id}>
              <img src={hall.image} alt={hall.name} />
              <div>
                <h3>{hall.name}</h3>
                <p>{hall.district}</p>
                <p>{hall.price}$ / person</p>
              </div>
              <Link to={`/hall/${hall.id}`}>
                <button>{user ? "View Details" : "Login"}</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
