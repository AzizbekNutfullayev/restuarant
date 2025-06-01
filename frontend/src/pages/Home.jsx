import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(null);
  const [count_people, setCountPeople] = useState("");

  const [bookedDates, setBookedDates] = useState([]);

  const [rayonFilter, setRayonFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // To'yxonalarni yuklash
  useEffect(() => {
    const loadHalls = async () => {
      try {
        console.log("To'yxonalar ma'lumotlari yuklanmoqda...");
        setLoading(true);
        const res = await axios.get("http://localhost:1111/user/img");
        console.log("Backenddan ma'lumot keldi:", res.data);

        // To'liq URL yaratish
        const hallsWithFullImageUrl = res.data.map(hall => ({
          ...hall,
          image: hall.image ? `http://localhost:1111/${hall.image}` : null
        }));

        setHalls(hallsWithFullImageUrl);
        console.log("To'yxonalar state ga o'rnatildi:", hallsWithFullImageUrl);
      } catch (err) {
        console.error("To'yxonalarni yuklashda xatolik:", err);
        setError("To'yxonalarni yuklashda xatolik: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
        console.log("To'yxonalar yuklanish jarayoni tugadi");
      }
    };
    loadHalls();
  }, []);

  // Tanlangan to'yxonaning band sanalarini olish
  useEffect(() => {
    if (!selectedHall) return;

    const getBookedDates = async () => {
      try {
        console.log("Band sanalar olinmoqda, tanlangan to'yxona:", selectedHall);
        const res = await axios.get(`http://localhost:1111/api/bron/hall/${selectedHall.id}`);
        const formatted = res.data.map((d) => new Date(d.date));
        setBookedDates(formatted);
        console.log("Band sanalar (Date obyektlari):", formatted);
      } catch (err) {
        console.error("Band sanalarni olishda xatolik:", err);
      }
    };
    getBookedDates();
  }, [selectedHall]);

  const openModal = (hall) => {
    console.log("Modal ochilmoqda, tanlangan to'yxona:", hall);
    setSelectedHall(hall);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Modal yopilmoqda");
    setIsModalOpen(false);
    setSelectedHall(null);
    setName("");
    setPhone("");
    setDate(null);
    setCountPeople("");
    setBookedDates([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Bron formasi yuborilmoqda...");
    try {
      const payload = {
        toyxona_id: selectedHall.id,
        name,
        phone,
        date,
        count_people,
      };
      console.log("Bron uchun yuborilayotgan ma'lumotlar:", payload);

      await axios.post("http://localhost:1111/api/bron/create", payload);

      alert("Bron qilindi!");
      closeModal();
    } catch (err) {
      console.error("Bron qilishda xatolik:", err);
      alert("Bron qilishda xatolik: " + (err.response?.data?.message || err.message));
    }
  };

  // Filtrlash va saralash
  const filteredAndSortedHalls = halls
    .filter(
      (hall) =>
        hall.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (rayonFilter === "" || hall.rayon === rayonFilter) &&
        (minCapacity === "" || hall.seat_count >= Number(minCapacity))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.seat_price - b.seat_price;
      if (sortOrder === "desc") return b.seat_price - a.seat_price;
      return 0;
    });

  console.log("Filterlangan va saralangan to'yxonalar:", filteredAndSortedHalls);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Barcha To'yxonalar</h2>

        <div className="filter-sort">
          <input
            type="text"
            placeholder="Toyxona nomi boyicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={rayonFilter} onChange={(e) => setRayonFilter(e.target.value)}>
            <option value="">Barcha rayonlar</option>
            {[...new Set(halls.map((h) => h.rayon))].map((rayon, i) => (
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
            placeholder="Min sigim"
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
                {hall.image ? (
                  <img
                    src={hall.image}
                    alt={hall.name}
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: 150,
                      backgroundColor: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                      borderRadius: "8px",
                      fontSize: 14,
                      marginBottom: "10px",
                    }}
                  >
                    Rasm mavjud emas
                  </div>
                )}
                <h3>{hall.name}</h3>
                <p>Rayon: {hall.rayon}</p>
                <p>Sigim: {hall.seat_count}</p>
                <p>Narx: ${hall.seat_price}</p>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && selectedHall && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closeModal}>&times;</span>
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
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date()}
                  excludeDates={bookedDates}
                  placeholderText="Sanani tanlang"
                  dateFormat="yyyy-MM-dd"
                  className="custom-datepicker"
                  required
                />
                <input
                  type="number"
                  placeholder="Odamlar soni"
                  value={count_people}
                  onChange={(e) => setCountPeople(e.target.value)}
                  required
                />
                <button type="submit" className="bron-button">Bron qilish</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
