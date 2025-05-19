import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

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
          <p>Hech qanday bron yoq</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Toyxona</th>
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
