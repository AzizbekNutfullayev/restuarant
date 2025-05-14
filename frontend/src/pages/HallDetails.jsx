import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState } from "react";

const HallDetails = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    guests: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bron qilindi:", form);
  };

  const bookedDates = ["2024-04-04", "2024-04-08", "2024-04-15"];

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="hall-card">
          <div style={{ flex: 1 }}>
            <h3>Rayxon</h3>
            <p><strong>Address:</strong> 123 Main St</p>
            <p><strong>Capacity:</strong> 100</p>
            <p><strong>Price:</strong> $1000</p>
            <p><strong>Phone:</strong> 123-456-7890</p>
          </div>

          <div style={{ flex: 1 }}>
            <h4>April 2024</h4>
            <div className="calendar-grid">
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const dateStr = `2024-04-${day.toString().padStart(2, "0")}`;
                const isBooked = bookedDates.includes(dateStr);
                return (
                  <div key={day} className={`calendar-day ${isBooked ? "booked" : ""}`}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="login-container" style={{ marginTop: 40 }}>
          <h2>Bron qilish</h2>
          {user ? (
            <form onSubmit={handleSubmit}>
              <label>First name</label>
              <input name="firstName" onChange={handleChange} />

              <label>Last name</label>
              <input name="lastName" onChange={handleChange} />

              <label>Phone</label>
              <input name="phone" onChange={handleChange} />

              <label>Guests</label>
              <input name="guests" type="number" onChange={handleChange} />

              <label>Date (yyyy-mm-dd)</label>
              <input name="date" type="date" onChange={handleChange} />

              <button type="submit">Bron qilish</button>
            </form>
          ) : (
            <p style={{ color: "red" }}>Iltimos, login qiling.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HallDetails;
