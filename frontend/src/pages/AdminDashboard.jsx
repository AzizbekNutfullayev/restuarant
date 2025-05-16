import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

// Mock data
const mockHalls = [
  { id: 1, name: "Rayxon", capacity: 300, price: 150, status: "tasdiqlanmagan" },
  { id: 2, name: "White Bird", capacity: 500, price: 250, status: "tasdiqlangan" },
];

const AdminDashboard = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    setHalls(mockHalls); // backenddan keladigan joy
  }, []);

  const handleApprove = (id) => {
    setHalls((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "tasdiqlangan" } : h))
    );
  };

  const handleDelete = (id) => {
    setHalls((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>Admin Panel</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nomi</th>
              <th>Sig‘im</th>
              <th>Narx</th>
              <th>Status</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.name}</td>
                <td>{hall.capacity}</td>
                <td>{hall.price}$</td>
                <td>{hall.status}</td>
                <td>
                  {hall.status === "tasdiqlanmagan" ? (
                    <button onClick={() => handleApprove(hall.id)}>Tasdiqlash</button>
                  ) : (
                    <span>✔</span>
                  )}
                  <button onClick={() => handleDelete(hall.id)} style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}>
                    O‘chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
