import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
const Home = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bron formasi uchun state'lar
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [count_people, setCountPeople] = useState("");

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1111/user/");
        setHalls(res.data.data || []);
      } catch (err) {
        setError("To'yxonalarni yuklashda xatolik: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  const openModal = (hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
    // formani tozalash
    setName("");
    setPhone("");
    setDate("");
    setCountPeople("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1111/api/bron/create", {
        toyxona_id: selectedHall.id,
        name,
        phone,
        date,
        count_people
      });
      alert("✅ Bron qilindi!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("❌ Bron qilishda xatolik: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Barcha To'yxonalar</h2>

        {loading ? (
          <div className="loading">Yuklanmoqda...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : halls.length === 0 ? (
          <p className="no-halls">Hozircha tasdiqlangan to'yxona mavjud emas</p>
        ) : (
          <div className="hall-list">
            {halls.map((hall) => (
              <div key={hall.id} className="hall-card" onClick={() => openModal(hall)}>
                <div className="placeholder-image">To'yxona rasmi</div>
                <h3>{hall.name}</h3>
                <p>Rayon: {hall.rayon}</p>
                <p>Narx: ${hall.seat_price}</p>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && selectedHall && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedHall.name}</h2>
              <p><strong>Rayon:</strong> {selectedHall.rayon}</p>
              <p><strong>Manzil:</strong> {selectedHall.address}</p>
              <p><strong>Sig'imi:</strong> {selectedHall.seat_count} kishi</p>
              <p><strong>Narx:</strong> ${selectedHall.seat_price}</p>
              <p><strong>Telefon:</strong> {selectedHall.phone}</p>

              <form onSubmit={handleSubmit} className="bron-form">
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefon raqamingiz"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Odamlar soni"
                  value={count_people}
                  onChange={(e) => setCountPeople(e.target.value)}
                  required
                />
                <button type="submit" className="bron-button">
                  Bron qilish
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
