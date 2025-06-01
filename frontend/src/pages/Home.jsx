import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const Home = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [count_people, setCountPeople] = useState("");

  const [rayonFilter, setRayonFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadHalls = async () => {
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

  useEffect(() => {
    loadHalls();
  }, []);

  const openModal = (hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
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

  const filteredAndSortedHalls = halls
    .filter(hall =>
      hall.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (rayonFilter === "" || hall.rayon === rayonFilter) &&
      (minCapacity === "" || hall.seat_count >= Number(minCapacity))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.seat_price - b.seat_price;
      if (sortOrder === "desc") return b.seat_price - a.seat_price;
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Barcha To'yxonalar</h2>

        <div className="filter-sort">
          <input
            type="text"
            placeholder="To’yxona nomi bo‘yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={rayonFilter} onChange={(e) => setRayonFilter(e.target.value)}>
            <option value="">Barcha rayonlar</option>
            {[...new Set(halls.map(h => h.rayon))].map((rayon, i) => (
              <option key={i} value={rayon}>{rayon}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Saralash</option>
            <option value="asc">Narx: arzon → qimmat</option>
            <option value="desc">Narx: qimmat → arzon</option>
          </select>
          <input
            type="number"
            placeholder="Min sig‘im"
            value={minCapacity}
            onChange={(e) => setMinCapacity(e.target.value)}
          />
        </div>


        {loading ? (
          <div className="loading">Yuklanmoqda...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredAndSortedHalls.length === 0 ? (
          <p className="no-halls">Natija topilmadi</p>
        ) : (
          <div className="hall-list">
            {filteredAndSortedHalls.map((hall) => (
              <div key={hall.id} className="hall-card" onClick={() => openModal(hall)}>
                <div className="placeholder-image">To'yxona rasmi</div>
                <h3>{hall.name}</h3>
                <p>Rayon: {hall.rayon}</p>
                <p>Sig‘im: {hall.seat_count}</p>
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

              <button
                type="button"
                className="bron-button"
                onClick={() => setIsCalendarOpen(true)}
              >
                Sanani tanlash
              </button>

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
                  type="text"
                  placeholder="Tanlangan sana"
                  value={date}
                  readOnly
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

        {isCalendarOpen && selectedHall && (
          <CalendarModal
            hall={selectedHall}
            onClose={() => setIsCalendarOpen(false)}
            onSelectDate={(selected) => setDate(selected)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
