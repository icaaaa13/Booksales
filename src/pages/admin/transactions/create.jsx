import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../../_api"; // Sesuaikan path _api Anda

export default function TransactionCreate() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBook = location.state?.selectedBook;

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Ambil harga dari buku yang diklik (jika ada), jika tidak default ke 75000
  const pricePerItem = selectedBook?.price || 75000;
  const totalAmount = quantity * pricePerItem;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Kirim data ke backend Laravel
      const payload = {
        order_number: "TRX-" + Date.now(), // Generate nomor order unik
        customer_id: 1, // Sesuaikan id customer/user yang sedang login
        book_id: selectedBook?.id || 1,
        total_amount: totalAmount,
      };

      await API.post("/transactions", payload);
      
      alert("Transaksi berhasil disimpan ke database!");
      navigate("/admin/transactions"); // Langsung arahkan ke halaman transaksi admin
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 p-6 flex items-center justify-center">
      <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Form Pemesanan Buku</h2>
        
        {selectedBook && (
          <div className="bg-slate-800/50 p-4 rounded-xl mb-6 border border-slate-700">
            <p className="text-xs text-slate-400">Buku yang Dipilih</p>
            <h3 className="text-lg font-bold text-white">{selectedBook.title}</h3>
            <p className="text-sm text-slate-400">Penulis: {selectedBook.author?.name || "Pilihan"}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Jumlah Pesanan</label>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center py-3 border-t border-slate-800">
            <span className="text-slate-400">Total Pembayaran:</span>
            <span className="text-xl font-bold text-indigo-400">
              Rp {totalAmount.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg font-semibold transition"
            >
              Kembali
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition cursor-pointer"
            >
              {loading ? "Menyimpan..." : "Konfirmasi Pesan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}