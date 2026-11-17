import { useState, useEffect } from "react"; // <-- Tambahkan useState dan useEffect di sini
import { Link, useNavigate } from "react-router-dom"; // <-- Tambahkan useNavigate jika ingin redirect

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Cek token di localStorage saat Navbar dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login"); // Mengarahkan kembali ke halaman login
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
      {/* Logo Brand */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-xl text-indigo-400">BookSales</Link>
      </div>
      
      {/* Menu Navigasi Utama */}
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
        <Link to="/books" className="hover:text-indigo-400 transition">Katalog Buku</Link>
        <Link to="/about" className="hover:text-indigo-400 transition">About</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link>
      </div>

      {/* Tombol Aksi (Auth) - Berubah otomatis berdasarkan status login */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30">
              Akun Customer
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-rose-600 hover:bg-rose-700 rounded-lg transition text-white cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-indigo-400 transition">Masuk</Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">Bergabung</Link>
          </div>
        )}
      </div>
    </nav>
  );
}