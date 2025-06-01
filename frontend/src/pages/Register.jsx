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
    <div
      className="login-container"
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: 10,
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        backgroundImage: `url("https://i.pinimg.com/236x/7a/eb/0e/7aeb0e8ada06c6ce84dbc0bc88f01c36.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#333"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#222" }}>
        Owner Ro'yxatdan O'tish
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstname"
          onChange={handleChange}
          placeholder="Ism"
          required
          style={{ width: "100%", marginBottom: 15, padding: 8, borderRadius: 4 }}
        />
        <input
          name="lastname"
          onChange={handleChange}
          placeholder="Familiya"
          required
          style={{ width: "100%", marginBottom: 15, padding: 8, borderRadius: 4 }}
        />
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
          style={{ width: "100%", marginBottom: 15, padding: 8, borderRadius: 4 }}
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Parol"
          required
          style={{ width: "100%", marginBottom: 15, padding: 8, borderRadius: 4 }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#4a7cff",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default Register;
