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
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      alert("Faqat rasm faylini tanlang");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!user?.userId || user.role !== "owner") {
      setError("Faqat owner foydalanuvchi to‘yxona qo‘sha oladi.");
      return;
    }

    if (!file) {
      setError("Iltimos, bitta rasm tanlang.");
      return;
    }

    try {
      const payload = { ...form, owner_id: user.userId };
      const res = await axios.post("http://localhost:1111/toyxonalar/", payload);
      const hallId = res.data?.data?.id;
      if (!hallId) {
        setError("To‘yxona yaratishda xatolik.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token topilmadi. Iltimos, tizimga kiring.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("toyxona_id", hallId);

      await axios.post("http://localhost:1111/toyxonalar/upload-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("To‘yxona va rasm muvaffaqiyatli qo‘shildi!");
      setForm({
        name: "",
        rayon: "",
        address: "",
        seat_price: "",
        seat_count: "",
        phone: ""
      });
      setFile(null);
      setPreview(null);

      setTimeout(() => navigate("/owner"), 1500);
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Jarayon davomida xatolik yuz berdi.");
    }
  };

  if (!user || user.role !== "owner") {
    return (
      <div className="login-container">
        <h2>Faqat owner foydalanuvchi to‘yxona qo‘sha oladi.</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px", margin: "auto" }}>
        <h2>Yangi To‘yxona Qo‘shish</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Rayon</label>
          <select name="rayon" value={form.rayon} onChange={handleChange} required>
            <option value="">Tanlang</option>
            {[
              "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulugbek",
              "Olmazor", "Sergeli", "Shayxontohur", "Uchtepa",
              "Yakkasaroy", "Yashnobod", "Yunusobod"
            ].map((rayon) => (
              <option key={rayon} value={rayon}>{rayon}</option>
            ))}
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

          <label>Rasm yuklash (1 dona)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {preview && (
            <div style={{ marginTop: "10px" }}>
              <p>Tanlangan rasm:</p>
              <img src={preview} alt="Preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
            </div>
          )}

          <button type="submit" style={{ marginTop: "15px" }}>
            Qo‘shish
          </button>
        </form>
      </div>
    </>
  );
};

export default AddHall;
