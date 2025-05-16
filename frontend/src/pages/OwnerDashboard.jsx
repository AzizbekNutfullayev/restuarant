import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

// Mock data
const mockHalls = [
  {
    id: 1,
    name: "Rayxon",
    capacity: 300,
    price: 150,
    bookings: [
      { date: "2024-06-10", guests: 100, user: "Ali" },
      { date: "2024-06-22", guests: 80, user: "Vali" },
    ],
  },
  {
    id: 2,
    name: "White Bird",
    capacity: 500,
    price: 250,
    bookings: [],
  },
];

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    // Hozircha mock orqali
    if (user?.role === "owner") {
      setHalls(mockHalls);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>Mening to‘yxonalarim</h1>
        {halls.length === 0 ? (
          <p>Sizda hali to‘yxona yo‘q</p>
        ) : (
          halls.map((hall) => (
            <div key={hall.id} className="hall-card" style={{ flexDirection: "column" }}>
              <h3>{hall.name}</h3>
              <p>Sig‘im: {hall.capacity}</p>
              <p>Narx: {hall.price}$</p>

              <h4>Bronlar:</h4>
              {hall.bookings.length === 0 ? (
                <p>Hali bron qilinmagan</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sana</th>
                      <th>Odamlar</th>
                      <th>Kim tomonidan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hall.bookings.map((b, i) => (
                      <tr key={i}>
                        <td>{b.date}</td>
                        <td>{b.guests}</td>
                        <td>{b.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
