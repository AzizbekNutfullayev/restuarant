import { useEffect, useState } from "react";
import axios from "axios";

const AdminBronlar = () => {
  const [bronlar, setBronlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [rayonFilter, setRayonFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    loadBronlar();
  }, []);

  const loadBronlar = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:1111/api/bron/all");
      console.log("API javobi:", res.data);
      setBronlar(res.data.data || []); // <-- .data bo'lishi kerak
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Xatolik: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const d = new Date(date).setHours(0, 0, 0, 0);
    return d < today ? "Bo‘lib o‘tgan" : "Bo‘lajak";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu bronni o‘chirishni xohlaysizmi?")) return;
    try {
      await axios.delete(`http://localhost:1111/api/bron/delete/${id}`);
      setBronlar((prev) => prev.filter((b) => b.id !== id));
      alert("Bron o‘chirildi");
    } catch (err) {
      alert("O‘chirishda xatolik: " + (err.response?.data?.message || err.message));
    }
  };

  const filtered = bronlar
    .filter((b) => {
      if (statusFilter) {
        const s = getStatus(b.date);
        if (statusFilter === "past" && s !== "Bo‘lib o‘tgan") return false;
        if (statusFilter === "future" && s !== "Bo‘lajak") return false;
      }
      if (rayonFilter && b.rayon !== rayonFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return sortOrder === "asc" ? da - db : db - da;
    });

  if (loading) return <div className="container">Yuklanmoqda...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h2>Admin Panel – Barcha Bronlar</h2>

      <div className="filter-sort">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Status: barchasi</option>
          <option value="future">Bo‘lajak</option>
          <option value="past">Bo‘lib o‘tgan</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Sana: eng yangi → eski</option>
          <option value="asc">Sana: eski → yangi</option>
        </select>
      </div>

      <table className="bron-table">
        <thead>
          <tr>
            <th>Toyxona</th>
            <th>Rayon</th>
            <th>Ism</th>
            <th>Telefon</th>
            <th>Sana</th>
            <th>Odam</th>
            <th>Status</th>
            <th>Amal</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b) => (
            <tr key={b.id}>
              <td>{b.toyxona_name}</td>
              <td>{b.rayon}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.date}</td>
              <td>{b.count_people}</td>
              <td>{getStatus(b.date)}</td>
              <td>
                <button onClick={() => handleDelete(b.id)}>Ochirish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBronlar;
