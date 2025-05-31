import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [failCount, setFailCount] = useState(0);

  const MAX_FAIL = 3; // maksimal xatoliklar soni

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:1111/auth/login", {
        username,
        password,
      });

      setFailCount(0); // muvaffaqiyatda fail countni reset qilamiz

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
