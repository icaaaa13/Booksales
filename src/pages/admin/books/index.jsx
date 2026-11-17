import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../_api"; 

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books");
      const bookData = response.data.data || response.data;
      setBooks(Array.isArray(bookData) ? bookData : []);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        await API.delete(`/books/${id}`);
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Gagal menghapus buku:", error);
        alert("Gagal menghapus buku.");
      }
    }
  };

  return (
    <div className="p-6 text-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Daftar Buku (Books)</h1>
        <Link
          to="/admin/books/create"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition"
        >
          + Tambah Buku
        </Link>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Judul Buku</th>
                <th className="py-4 px-6">Penulis (Author)</th>
                <th className="py-4 px-6">Tahun Terbit</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-400">
                    Memuat data buku...
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-400">
                    Belum ada data buku.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-4 px-6 font-medium text-slate-300">{book.id}</td>
                    <td className="py-4 px-6 text-white font-semibold">{book.title}</td>
                    <td className="py-4 px-6 text-slate-300">
                      {book.author ? book.author.name : "Penulis tidak ditemukan"}
                    </td>
                    <td className="py-4 px-6 text-slate-400">{book.release_year}</td>
                    <td className="py-4 px-6 text-center space-x-2">
                      <Link
                        to={`/admin/books/edit/${book.id}`}
                        className="px-3 py-1 bg-amber-600/80 hover:bg-amber-600 text-white text-xs rounded-md transition"
                      >
                        Ubah
                      </Link>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="px-3 py-1 bg-rose-600/80 hover:bg-rose-600 text-white text-xs rounded-md transition cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}