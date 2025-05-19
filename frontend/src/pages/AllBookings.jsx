import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";


const mockBookings = [
  {
    id: 101,
    hall: "Rayxon",
    user: { name: "Ali", phone: "+99890..." },
    date: "2024-06-15",
    guests: 150,
    status: "endi boladigan"
  },
  {
    id: 102,
    hall: "White Bird",
    user: { name: "Aziz", phone: "+99891..." },
    date: "2024-04-20",
    guests: 120,
    status: "bolib otgan"
  },
  {
    id: 103,
    hall: "Surpose",
    user: { name: "Vali", phone: "+99899..." },
    date: "2024-07-10",
    guests: 200,
    status: "endi boladigan"
  },
];

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(mockBookings); 
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>Barcha Bronlar (Admin)</h1>
        {bookings.length === 0 ? (
          <p>Hech qanday bron yo‘q</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>To‘yxona</th>
                <th>Sana</th>
                <th>Odamlar</th>
                <th>Foydalanuvchi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.hall}</td>
                  <td>{b.date}</td>
                  <td>{b.guests}</td>
                  <td>
                    {b.user.name} <br />
                    <small>{b.user.phone}</small>
                  </td>
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

export default AllBookings;
