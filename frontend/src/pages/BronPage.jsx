import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BronPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    count_people: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("Iltimos, avval tizimga kiring.");
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:1111/api/bron/create",
        {
          toyxona_id: id,
          date: formData.date,
          count_people: formData.count_people
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(" Bron muvaffaqiyatli qilindi!");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || " Bron qilishda xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>To'yxonani bron qilish</h2>
      <form onSubmit={handleSubmit} className="bron-form">
        <label>
          Sana:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Odamlar soni:
          <input
            type="number"
            name="count_people"
            value={formData.count_people}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Yuborilmoqda..." : "Bron qilish"}
        </button>
      </form>
    </div>
  );
};

export default BronPage;
