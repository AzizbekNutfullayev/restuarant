import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:1111/auth/login", {
        username,
        password
      });

      const token = res.data.token;
      const payload = JSON.parse(atob(token.split(".")[1])); // token ichidan user ma'lumot

      const user = {
        userId: payload.userId,
        username: payload.username,
        role: payload.role,
        token
      };

      // 🔐 Saqlab qo'yamiz
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ➡️ Ruxsatga qarab yo'naltiramiz
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "owner") navigate("/owner");
      else navigate("/");

    } catch (err) {
      console.error("Login xatoligi:", err);
      setError("Login muvaffaqiyatsiz");
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
