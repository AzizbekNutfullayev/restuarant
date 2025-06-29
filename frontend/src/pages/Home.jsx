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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("🔄 useEffect: Boshlandi (Halls yuklanmoqda)");
    const loadHalls = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1111/user/img");
        console.log("✅ Backend javobi (halls):", res.data);
  
        const hallsWithFullImageUrl = res.data.map(hall => ({
          ...hall,
          image: hall.image ? `http://localhost:1111/${hall.image}` : null
        }));
  
        setHalls(hallsWithFullImageUrl);
        console.log("✅ State yangilandi (halls):", hallsWithFullImageUrl);
      } catch (err) {
        console.error("❌ Halls yuklashda xatolik:", err);
        setError("To'yxonalarni yuklashda xatolik: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
        console.log("✅ useEffect: Tugadi (Halls)");
      }
    };
    loadHalls();
  }, []);
  
  useEffect(() => {
    if (!selectedHall) {
      console.log("📛 useEffect: selectedHall null");
      return;
    }
  
    console.log("📥 useEffect: Band sanalarni olish", selectedHall);
    const getBookedDates = async () => {
      try {
        const res = await axios.get(`http://localhost:1111/api/bron/hall/${selectedHall.id}`);
        const formatted = res.data.map((d) => new Date(d.date));
        setBookedDates(formatted);
        console.log("✅ Band sanalar olindi:", formatted);
      } catch (err) {
        console.error("❌ Band sanalarni olishda xatolik:", err);
      }
    };
    getBookedDates();
  }, [selectedHall]);
  
  const openModal = (hall) => {
    console.log("📂 Modal ochilmoqda:", hall);
    setSelectedHall(hall);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    console.log("❎ Modal yopildi");
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
    console.log("📤 Bron form yuborilmoqda...");
  
    if (!date) return alert("Iltimos, sanani tanlang.");
    if (!name.trim()) return alert("Iltimos, ismingizni kiriting.");
    if (!phone.trim() || phone.length < 7) return alert("Iltimos, to‘g‘ri telefon raqam kiriting.");
    if (!count_people || parseInt(count_people) < 1) return alert("Odamlar soni 1 dan kam bo‘lmasligi kerak.");
  
    setIsSubmitting(true);
  
    try {
      const payload = {
        toyxona_id: selectedHall.id,
        name: name.trim(),
        phone: phone.trim(),
        date: formatDate(date),
        count_people: parseInt(count_people),
      };
      console.log("📦 Yuborilayotgan payload:", payload);
  
      const res = await axios.post("http://localhost:1111/api/bron/create", payload);
      console.log("✅ Bron yaratildi:", res.data);
  
      alert(res.data?.message || "Bron muvaffaqiyatli amalga oshirildi!");
      closeModal();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      console.error("❌ Bron yaratishda xatolik:", msg);
  
      if (msg.includes("band")) {
        alert("Ushbu sana band qilingan. Iltimos, boshqa sanani tanlang.");
      } else {
        alert("Xatolik: " + msg);
      }
    } finally {
      setIsSubmitting(false);
      console.log("✅ Form yuborish yakunlandi");
    }
  };
  
  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    console.log("🗓 Sanani formatlash:", formatted);
    return formatted;
  };
    

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
              <p><strong>Telefonn:</strong> {selectedHall.phone}</p>

              <form onSubmit={handleSubmit} className="bron-form">
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Telefon raqamingiz"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date()}
                  excludeDates={bookedDates}
                  placeholderText="Sanani tanlang"
                  dateFormat="yyyy-MM-dd"
                  className="custom-datepicker"
                />
                <input
                  type="number"
                  placeholder="Odamlar soni"
                  value={count_people}
                  onChange={(e) => setCountPeople(e.target.value)}
                />
                <button type="submit" className="bron-button" disabled={isSubmitting}>
                  {isSubmitting ? "Yuborilmoqda..." : "Bron qilish"}
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
