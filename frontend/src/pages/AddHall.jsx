import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddHall = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    rayon: "",
    address: "",
    seat_price: "",
    seat_count: "",
    phone: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!user?.userId || user.role !== "owner") {
      return setError("Faqat owner foydalanuvchi to'yxona qo‘sha oladi.");
    }

    const payload = {
      ...form,
      owner_id: user.userId,
    };

    try {
      const res = await api.post("/toyxonalar", payload);
      setMessage(res.data.message || "Toyxona qo‘shildi!");
      navigate("/owner");
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi");
      console.error("Xatolik:", err);
    }
  };

  if (!user || user.role !== "owner") {
    return (
      <div className="login-container">
        <h2>Faqat owner foydalanuvchi to'yxona qo‘sha oladi</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px" }}>
        <h2>Yangi To'yxona Qo‘shish</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Rayon</label>
          <input name="rayon" value={form.rayon} onChange={handleChange} required />

          <label>Manzil</label>
          <input name="address" value={form.address} onChange={handleChange} required />

          <label>Narxi (so‘m)</label>
          <input
            name="seat_price"
            type="number"
            value={form.seat_price}
            onChange={handleChange}
            required
          />

          <label>Sig‘imi (kishilar soni)</label>
          <input
            name="seat_count"
            type="number"
            value={form.seat_count}
            onChange={handleChange}
            required
          />

          <label>Telefon raqam</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />

          <button type="submit">Qo‘shish</button>
        </form>
      </div>
    </>
  );
};

export default AddHall;
