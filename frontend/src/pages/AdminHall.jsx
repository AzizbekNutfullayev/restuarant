import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminAddHall = () => {
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
    phone: "",
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
      owner_id: user?.userId,
    };

    try {
      const res = await api.post("/admin/add-hall", payload);
      setMessage(res.data.message || "Qoshildi!");
      navigate("/admin");
    } catch (err) {
      setMessage(err.response?.data?.message || "Xatolik yuz berdi");
      console.error(err);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="login-container">
        <h2>Faqat admin foydalanuvchi bu sahifaga kira oladi</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px" }}>
        <h2>Admin: Yangi Toyxona Qoshish</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" onChange={handleChange} required />

          <label htmlFor="rayon">Rayon</label>
          <select name="rayon" id="rayon" onChange={handleChange} required>
            <option value="">Rayonni tanlang</option>
            <option value="Chilonzor">Chilonzor</option>
            <option value="Mirzo Ulug'bek">Mirzo Ulug'bek</option>
            <option value="Yunusobod">Yunusobod</option>
            <option value="Yakkasaroy">Yakkasaroy</option>
            <option value="Sergeli">Sergeli</option>
            <option value="Uchtepa">Uchtepa</option>
            <option value="Olmazor">Olmazor</option>
            <option value="Shayxontohur">Shayxontohur</option>
            <option value="Bektemir">Bektemir</option>
          </select>


          <label>Manzil</label>
          <input name="address" onChange={handleChange} required />

          <label>Narxi ($)</label>
          <input
            name="seat_price"
            type="number"
            onChange={handleChange}
            required
          />

          <label>Sigimi (kishilar soni)</label>
          <input
            name="seat_count"
            type="number"
            onChange={handleChange}
            required
          />

          <label>Telefon</label>
          <input name="phone" onChange={handleChange} required />

          <button type="submit">Qoshish</button>
        </form>
      </div>
    </>
  );
};

export default AdminAddHall;
