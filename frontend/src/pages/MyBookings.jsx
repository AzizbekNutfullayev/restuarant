import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const mockBookings = [
  {
    id: 1,
    hallName: "Rayxon",
    date: "2024-06-15",
    guests: 150,
    status: "bo‘lib o‘tgan",
  },
  {
    id: 2,
    hallName: "Surpose",
    date: "2024-08-02",
    guests: 100,
    status: "endi bo‘ladigan",
  },
];

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      setBookings(mockBookings); // backend tayyor bo‘lganda axios bilan o‘zgartirasiz
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>Mening bronlarim</h1>
        {bookings.length === 0 ? (
          <p>Hozircha bron qilgan to‘yxonangiz yo‘q</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>To‘yxona</th>
                <th>Sana</th>
                <th>Odamlar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.hallName}</td>
                  <td>{b.date}</td>
                  <td>{b.guests}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyBookings;
