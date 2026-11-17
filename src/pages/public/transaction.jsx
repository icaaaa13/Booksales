import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data transaksi customer saat halaman dimuat
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal memuat transaksi:", error);
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus transaksi
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update state agar data langsung hilang dari tampilan tanpa reload
      setTransactions(transactions.filter((item) => item.id !== id));
      alert("Transaksi berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus transaksi:", error);
      alert("Terjadi kesalahan saat menghapus transaksi.");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-white">Memuat riwayat transaksi...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Riwayat Transaksi Customer</h1>
      
      {transactions.length === 0 ? (
        <p className="text-gray-300">Belum ada riwayat transaksi.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((trx) => (
            <div key={trx.id} className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">Order ID: #{trx.order_number || trx.id}</p>
                <p className="text-sm text-gray-300">Total: Rp {trx.total_amount}</p>
                <p className="text-xs text-gray-400">Status: Selesai</p>
              </div>
              <button
                onClick={() => handleDelete(trx.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}