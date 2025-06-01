import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [failCount, setFailCount] = useState(0);

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => document.body.classList.remove('login-page');
  }, []);

  const MAX_FAIL = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:1111/auth/login", { username, password });
      setFailCount(0);
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const user = {
        userId: payload.userId,
        username: payload.username,
        role: payload.role,
        token,
      };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "owner") navigate("/owner");
      else navigate("/");
    } catch (err) {
      setFailCount((prev) => prev + 1);
      const attemptsLeft = MAX_FAIL - (failCount + 1);
      if (attemptsLeft > 0) {
        setError(`Login muvaffaqiyatsiz. Qolgan urinishlar: ${attemptsLeft}`);
      } else {
        alert("3 marta noto‘g‘ri parol kiritdingiz! Iltimos, ro‘yxatdan o‘ting.");
        navigate("/register");
      }
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
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#222" }}>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 15, padding: 8, borderRadius: 4 }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Kirish
        </button>
      </form>
    </div>
  );
};

export default Login;
