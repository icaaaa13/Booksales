import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function BookCreate() {
  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    release_year: "",
  });

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await API.get("/authors");
        const authorData = response.data.data || response.data;
        setAuthors(Array.isArray(authorData) ? authorData : []);
      } catch (error) {
        console.error("Gagal mengambil data author:", error);
      }
    };
    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/books", {
        title: formData.title,
        author_id: Number(formData.author_id),
        release_year: Number(formData.release_year),
      });

      alert("Buku berhasil ditambahkan!");
      navigate("/admin/books");
    } catch (error) {
      console.error("Gagal menyimpan buku:", error);
      const errorMsg = error.response?.data?.message || "Terjadi kesalahan saat menyimpan buku.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tambah Buku Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Judul Buku
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan judul buku..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Penulis (Author)
            </label>
            <select
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">-- Pilih Penulis --</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tahun Rilis
            </label>
            <input
              type="number"
              name="release_year"
              value={formData.release_year}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Contoh: 2024"
              required
            />
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer"
            >
              {loading ? "Menyimpan..." : "Simpan Buku"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-750 dark:text-gray-300 dark:border-gray-500 cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}