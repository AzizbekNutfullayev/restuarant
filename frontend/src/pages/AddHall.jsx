import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddHall = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    rayon: "",
    address: "",
    seat_price: "",
    seat_count: "",
    phone: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
  ...form,
      owner_id: user?.userId
    };

    try {
      const res = await api.post("/toyxonalar", payload);
      setMessage(res.data.message);
      navigate("/owner");
    } catch (err) {
      setMessage(err.response?.data?.message || "Xatolik yuz berdi");
      console.error(err);
    }
  };

  if (!user || user.role !== "owner") {
    return (
      <div className="login-container">
        <h2>Faqat owner foydalanuvchi toyxona qosha oladi</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px" }}>
        <h2>Yangi Toyxona Qoshish</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" onChange={handleChange} required />

          <label>Rayon</label>
          <input name="rayon" onChange={handleChange} required />

          <label>Manzil</label>
          <input name="address" onChange={handleChange} required />

          <label>Narxi ($)</label>
          <input name="seat_price" type="number" onChange={handleChange} required />

          <label>Sigimi (kishilar soni)</label>
          <input name="seat_count" type="number" onChange={handleChange} required />

          <label>Telefon</label>
          <input name="phone" onChange={handleChange} required />

          <button type="submit">Qoshish</button>
        </form>
      </div>
    </>
  );
};

export default AddHall;
