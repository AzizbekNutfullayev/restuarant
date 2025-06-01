import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const BronPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [countPeople, setCountPeople] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  // Backenddan bron qilingan sanalarni olish (to'yxona id bo'yicha)
  useEffect(() => {
    axios.get(`http://localhost:1111/api/bron/bookedDates/${id}`)
      .then(res => {
       
        const dates = res.data.map(dateStr => new Date(dateStr));
        setBookedDates(dates);
      })
      .catch(() => {
        setError("Bron qilingan sanalarni olishda xatolik yuz berdi.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Iltimos, avval tizimga kiring.");
      return;
    }

    if (!selectedDate) {
      alert("Iltimos, sanani tanlang.");
      return;
    }

    if (!countPeople) {
      alert("Iltimos, odamlar sonini kiriting.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:1111/api/bron/create",
        {
          toyxona_id: id,
          date: selectedDate.toISOString().split("T")[0], 
          count_people: countPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Bron muvaffaqiyatli qilindi!");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Bron qilishda xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  // Kalendar uchun sanalarni maxsus rang bilan ko'rsatish (bron qilinganlar qizil)
  const modifiers = {
    booked: bookedDates,
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: "#ff6b6b",
      color: "white",
      borderRadius: "50%",
    },
  };

  return (
    <div className="container" style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>To'yxonani bron qilish</h2>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={bookedDates}
        footer={
          <p style={{ fontStyle: "italic" }}>
            Qizil rangdagi kunlar allaqachon bron qilingan.
          </p>
        }
      />

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <label>
          Odamlar soni:
          <input
            type="number"
            name="count_people"
            value={countPeople}
            onChange={e => setCountPeople(e.target.value)}
            required
            min={1}
            style={{ marginLeft: 10, padding: 5, width: 100 }}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: "8px 16px" }}>
          {loading ? "Yuborilmoqda..." : "Bron qilish"}
        </button>
      </form>
    </div>
  );
};

export default BronPage;
