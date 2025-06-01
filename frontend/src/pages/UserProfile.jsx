import React, { useEffect, useState } from "react";
import axios from "axios";

const ToyxonalarList = () => {
  const [toyxonalar, setToyxonalar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToyxonalar = async () => {
      try {
        const res = await axios.get("http://localhost:1111/api/img");
        setToyxonalar(res.data);
        setLoading(false);
      } catch (err) {
        setError("Ma'lumotni olishda xatolik yuz berdi");
        setLoading(false);
      }
    };
    fetchToyxonalar();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>Toyxonalar ro‘yxati</h2>
      {toyxonalar.length === 0 && <p>Hech qanday toyxona topilmadi.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {toyxonalar.map((toyxona) => (
          <div
            key={toyxona.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 16,
              width: 280,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {toyxona.image ? (
              <img
                src={
                  toyxona.image.startsWith("http")
                    ? toyxona.image
                    : `http://localhost:1111/uploads/${toyxona.filename}`
                }
                alt={toyxona.name}
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 160,
                  backgroundColor: "#eee",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 6,
                  color: "#999",
                  fontStyle: "italic",
                }}
              >
                Rasm mavjud emas
              </div>
            )}
            <h3 style={{ marginTop: 12 }}>{toyxona.name}</h3>
            <p><strong>Manzil:</strong> {toyxona.address}</p>
            <p><strong>Rayon:</strong> {toyxona.rayon}</p>
            <p><strong>Telefon:</strong> {toyxona.phone}</p>
            <p><strong>O‘rindiq soni:</strong> {toyxona.seat_count}</p>
            <p><strong>Narxi:</strong> {toyxona.seat_price} so‘m</p>
            <p><strong>Status:</strong> {toyxona.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToyxonalarList;
