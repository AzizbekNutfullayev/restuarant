import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
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
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length > 4) {
      alert("Faqat 4 ta rasm yuklash mumkin");
      return;
    }
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!user?.userId || user.role !== "owner") {
      setError("Faqat owner foydalanuvchi to'yxona qo‘sha oladi.");
      return;
    }
    if (files.length === 0) {
      setError("Iltimos, 1 dan 4 gacha rasm tanlang.");
      return;
    }

    try {
      const payload = { ...form, owner_id: user.userId };
      const res = await axios.post("http://localhost:1111/toyxonalar/", payload);
      const hallId = res.data.data?.id;
      if (!hallId) {
        setError("To'yxona qo‘shishda xatolik yuz berdi");
        return;
      }

      const formData = new FormData();
      files.forEach(file => formData.append("images", file));
      formData.append("toyxona_id", hallId);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token topilmadi. Iltimos, tizimga kiring.");
        return;
      }

     await axios.post("http://localhost:1111/toyxonalar/upload-images", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("To'yxona va rasmlar muvaffaqiyatli qo‘shildi!");
      setForm({
        name: "",
        rayon: "",
        address: "",
        seat_price: "",
        seat_count: "",
        phone: ""
      });
      setFiles([]);

      navigate("/owner"); 

    } catch (err) {
      console.error("Xatolik:", err);
      setError("Jarayon davomida xatolik yuz berdi");
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
      <div className="login-container" style={{ maxWidth: "600px", margin: "auto" }}>
        <h2>Yangi To'yxona Qo‘shish va Rasmlar Yuklash</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Rayon</label>
          <select name="rayon" value={form.rayon} onChange={handleChange} required>
            <option value="">Tanlang</option>
            <option value="Bektemir">Bektemir</option>
            <option value="Chilonzor">Chilonzor</option>
            <option value="Mirobod">Mirobod</option>
            <option value="Mirzo Ulugbek">Mirzo Ulugbek</option>
            <option value="Olmazor">Olmazor</option>
            <option value="Sergeli">Sergeli</option>
            <option value="Shayxontohur">Shayxontohur</option>
            <option value="Uchtepa">Uchtepa</option>
            <option value="Yakkasaroy">Yakkasaroy</option>
            <option value="Yashnobod">Yashnobod</option>
            <option value="Yunusobod">Yunusobod</option>
          </select>

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

          <label>Rasmlar yuklash (max 4 ta)</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />

          <button type="submit" style={{ marginTop: "15px" }}>
            Qo‘shish va Rasmlarni Yuklash
          </button>
        </form>
      </div>
    </>
  );
};

export default AddHall;
