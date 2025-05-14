import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HallDetails from "./pages/HallDetails";
import Login from './pages/Login';
import Home from './pages/Home';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hall/:id" element={<HallDetails/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
