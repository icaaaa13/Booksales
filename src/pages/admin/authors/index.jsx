import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../_api"; 

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await API.get("/authors");
      // Mengambil data array dari berbagai kemungkinan struktur JSON Laravel
      const dataAuthors = response.data.data || response.data.authors || response.data;
      setAuthors(Array.isArray(dataAuthors) ? dataAuthors : []);
    } catch (error) {
      console.error("Gagal mengambil data penulis:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Hapus Penulis
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus penulis ini?")) {
      try {
        await API.delete(`/authors/${id}`);
        // Perbarui state agar tabel langsung ter-refresh tanpa perlu reload manual
        setAuthors(authors.filter((author) => author.id !== id));
      } catch (error) {
        console.error("Gagal menghapus penulis:", error);
      }
    }
  };

  return (
    <div className="p-6 text-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Daftar Penulis (Authors)</h1>
        <Link
          to="/admin/authors/create"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition"
        >
          + Tambah Penulis
        </Link>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Nama Penulis</th>
                <th className="py-4 px-6">Negara</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-400">
                    Memuat data penulis...
                  </td>
                </tr>
              ) : authors.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-400">
                    Belum ada data penulis.
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <tr key={author.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-4 px-6 font-medium text-slate-300">{author.id}</td>
                    <td className="py-4 px-6 text-white font-semibold">{author.name}</td>
                    <td className="py-4 px-6 text-slate-400">{author.country || "-"}</td>
                    <td className="py-4 px-6 text-center space-x-2">
                      <Link
                        to={`/admin/authors/edit/${author.id}`}
                        className="px-3 py-1 bg-amber-600/80 hover:bg-amber-600 text-white text-xs rounded-md transition"
                      >
                        Ubah
                      </Link>
                      <button
                        onClick={() => handleDelete(author.id)}
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