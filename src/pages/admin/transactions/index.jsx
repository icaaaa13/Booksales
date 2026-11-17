import { useState, useEffect } from "react";
import API from "../../../_api"; // Sesuaikan path _api jika berbeda

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data transaksi dari API Laravel
  const fetchTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      // Sesuaikan struktur response (apakah response.data atau langsung response.data.data)
      setTransactions(response.data.data || response.data);
    } catch (error) {
      console.error("Gagal memuat data transaksi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-6 text-white">Daftar Transaksi / Pesanan Buku</h1>

      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="p-4">ID</th>
              <th className="p-4">Order Number</th>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Book ID</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Tanggal Transaksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-400">Memuat data...</td>
              </tr>
            ) : transactions.length > 0 ? (
              transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4 font-medium text-white">{trx.id}</td>
                  <td className="p-4">{trx.order_number}</td>
                  <td className="p-4">{trx.customer_id}</td>
                  <td className="p-4">{trx.book_id}</td>
                  <td className="p-4 font-semibold text-indigo-400">
                    Rp {Number(trx.total_amount).toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(trx.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  Belum ada data transaksi yang tercatat di database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}