import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>Foydalanuvchi Profil</h1>
        {user ? (
          <div className="login-container" style={{ maxWidth: "500px" }}>
            <p><strong>Foydalanuvchi:</strong> {user.fullName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefon:</strong> {user.phone}</p>
            <p><strong>Roli:</strong> {user.role}</p>
          </div>
        ) : (
          <p style={{ color: "red" }}>Iltimos, login qiling.</p>
        )}
      </div>
    </>
  );
};

export default UserProfile;
