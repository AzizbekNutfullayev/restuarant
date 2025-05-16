import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Backendga login so‘rovi
      const res = await api.post("/auth/login", { username, password });

      // JWT tokenni olib, payloadni ajratish
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));

      // AuthContext uchun user
      const user = {
        id: payload.userId,
        username: payload.username,
        role: payload.role,
        token,
      };

      // tokenni axios headerga qo‘shish
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      login(user); // contextga yozish
      localStorage.setItem("token", token); // agar keyinchalik kerak bo‘lsa

      // ✅ ROLGA QARAB SAHIFAGA YUONALTIRISH
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "owner") navigate("/owner");
      else navigate("/"); // oddiy user
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login muvaffaqiyatsiz");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default Login;
