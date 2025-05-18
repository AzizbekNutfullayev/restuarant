import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddHall = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
      owner_id: user?.id
    };

    try {
      const res = await api.post("/toyxonalar", payload);
      setMessage(res.data.message);
      navigate("/owner"); // dashboardga yo‘naltirish
    } catch (err) {
      setMessage(err.response?.data?.message || "Xatolik yuz berdi");
      console.error(err);
    }
  };

  if (user?.role !== "owner") {
    return (
      <div className="login-container">
        <h2>Faqat owner foydalanuvchi to‘yxona qo‘sha oladi</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px" }}>
        <h2>Yangi To‘yxona Qo‘shish</h2>
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

          <label>Sig‘imi (kishilar soni)</label>
          <input name="seat_count" type="number" onChange={handleChange} required />

          <label>Telefon</label>
          <input name="phone" onChange={handleChange} required />

          <button type="submit">Qo‘shish</button>
        </form>
      </div>
    </>
  );
};

export default AddHall;
