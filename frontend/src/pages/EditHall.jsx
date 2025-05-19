
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EditHall = () => {
  const { id } = useParams(); 
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

  useEffect(() => {
    axios.get(`http://localhost:1111/toyxonalar/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Ma'lumot olishda xatolik:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.patch(`http://localhost:1111/toyxonalar/${id}`, form);
      setMessage("Toyxona yangilandi");
      navigate("/owner");
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
      setMessage("Xatolik yuz berdi");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px" }}>
        <h2>Toyxona Tahrirlash</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Rayon</label>
          <input name="rayon" value={form.rayon} onChange={handleChange} required />

          <label>Manzil</label>
          <input name="address" value={form.address} onChange={handleChange} required />

          <label>Narxi ($)</label>
          <input name="seat_price" type="number" value={form.seat_price} onChange={handleChange} required />

          <label>Sigimi</label>
          <input name="seat_count" type="number" value={form.seat_count} onChange={handleChange} required />

          <label>Telefon</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />

          <button type="submit">Saqlash</button>
        </form>
      </div>
    </>
  );
};

export default EditHall;
