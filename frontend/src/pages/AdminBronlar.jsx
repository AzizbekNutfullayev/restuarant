import { useEffect, useState } from "react";
import axios from "axios";

const AdminBronlar = () => {
  const [bronlar, setBronlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBronlar = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1111/api/bron/all");
        setBronlar(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Xatolik: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchBronlar();
  }, []);

  if (loading) return <div className="container">Yuklanmoqda...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h2>Bronlar ro'yxati (Admin Panel)</h2>
      <table className="bron-table">
        <thead>
          <tr>
            <th>To'yxona</th>
            <th>Ism</th>
            <th>Telefon</th>
            <th>Sana</th>
            <th>Odam</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bronlar.map((b) => (
            <tr key={b.id}>
              <td>{b.toyxona_name}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.date}</td>
              <td>{b.count_people}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBronlar;
