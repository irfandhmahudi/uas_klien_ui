import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/main/Home.jsx";
import DetailPage from "./pages/main/DetailPage.jsx";
import Admin from "./pages/data/AdminControl.jsx";

function App() {
  return (
    <Router>
      {/* Tambahkan Toaster di luar Routes */}
      <Toaster position="top-center" />{" "}
      {/* Anda bisa menyesuaikan posisi sesuai kebutuhan */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
