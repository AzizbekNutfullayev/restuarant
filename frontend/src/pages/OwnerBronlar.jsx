import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OwnerBronlar = () => {
  const { owner_id } = useParams();
  const [bronlar, setBronlar] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:1111/api/bron/owner/${owner_id}`)
      .then(res => setBronlar(res.data.data || []))
      .catch(err => {
        console.error(err);
        setError("Bronlarni yuklashda xatolik");
      });
  }, [owner_id]);

  return (
    <div className="container">
      <h2>Bron qilinganlar (Sizning to‘yxonangiz bo‘yicha)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {bronlar.length === 0 ? (
        <p>Hali bron qilingan to’yxona yo‘q</p>
      ) : (
        <table className="bron-table">
          <thead>
            <tr>
              <th>To’yxona</th>
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
      )}
    </div>
  );
};

export default OwnerBronlar;
