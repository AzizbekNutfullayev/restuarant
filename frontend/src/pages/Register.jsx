import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: "owner",
  });

  // body ga .register-page sinfini qo‘shish
  useEffect(() => {
    document.body.classList.add('register-page');
    return () => document.body.classList.remove('register-page');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Ro'yxatdan o'tildi");
      navigate("/login");
    } catch (err) {
      alert("Xatolik: " + (err.response?.data?.message || "Server bilan bog'lanishda xatolik"));
    }
  };

  return (
    <div className="login-container">
      <h2>Owner Ro'yxatdan O'tish</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstname" onChange={handleChange} placeholder="Ism" required />
        <input name="lastname" onChange={handleChange} placeholder="Familiya" required />
        <input name="username" onChange={handleChange} placeholder="Username" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Parol" required />
        <button type="submit">Yuborish</button>
      </form>
    </div>
  );
};

export default Register;