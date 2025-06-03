import { useState, useEffect } from "react";
import axios from "axios";
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
    document.body.classList.add("register-page");
    return () => {
      document.body.classList.remove("register-page");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:1111/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Ro'yxatdan o'tildi");
      navigate("/login");
    } catch (err) {
      alert(
        "Xatolik: " +
          (err.response?.data?.message || "Server bilan bog'lanishda xatolik")
      );
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
        backgroundImage:
          'url("https://i.pinimg.com/236x/7a/eb/0e/7aeb0e8ada06c6ce84dbc0bc88f01c36.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#333",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#222" }}>
        Owner Ro'yxatdan O'tish
      </h2>
      <form onSubmit={handleSubmit}>
        {["firstname", "lastname", "username", "password"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            value={form[field]}
            onChange={handleChange}
            placeholder={
              field === "firstname"
                ? "Ism"
                : field === "lastname"
                ? "Familiya"
                : field === "username"
                ? "Username"
                : "Parol"
            }
            required
            style={{ width: "100%", marginBottom: 15, padding: 8, borderRadius: 4 }}
          />
        ))}
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
            cursor: "pointer",
          }}
        >
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default Register;
