import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddHall = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    district: "",
    address: "",
    price: "",
    capacity: "",
    phone: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock: print to console (keyinchalik API chaqiriladi)
    console.log("Yangi to‘yxona:", form);

    alert("To‘yxona qo‘shildi (mock)!");
    navigate("/owner"); // Keyin egasi dashboardga qaytadi
  };

  if (user?.role !== "owner" && user?.role !== "admin") {
    return (
      <>
        <Navbar />
        <div className="home-page">
          <h2>Faqat owner yoki admin to‘yxona qo‘sha oladi.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container" style={{ maxWidth: "600px" }}>
        <h2>Yangi To‘yxona Qo‘shish</h2>
        <form onSubmit={handleSubmit}>
          <label>Nomi</label>
          <input name="name" onChange={handleChange} required />

          <label>Rayon</label>
          <input name="district" onChange={handleChange} required />

          <label>Manzil</label>
          <input name="address" onChange={handleChange} required />

          <label>Narxi (1 o‘rin uchun $)</label>
          <input name="price" type="number" onChange={handleChange} required />

          <label>Sig‘im (kishilar soni)</label>
          <input name="capacity" type="number" onChange={handleChange} required />

          <label>Telefon</label>
          <input name="phone" onChange={handleChange} required />

          <label>Rasm URL</label>
          <input name="image" onChange={handleChange} />

          <button type="submit">Qo‘shish</button>
        </form>
      </div>
    </>
  );
};

export default AddHall;
