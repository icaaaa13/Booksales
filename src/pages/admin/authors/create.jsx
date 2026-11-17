import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../_api"; 

export default function AuthorCreate() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // Mengirim data 'name' dan 'country' ke endpoint backend Laravel
      await API.post("/authors", formData);
      alert("Author berhasil ditambahkan!");
      navigate("/admin/authors");
    } catch (error) {
      console.error("Gagal menambah author:", error);
      const errorMsg = error.response?.data?.message || "Terjadi kesalahan saat menyimpan penulis.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tambah Author Baru
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input Nama Author */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Author
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan nama penulis..."
              required
            />
          </div>

          {/* Input Negara (Country) */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Negara (Country)
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Contoh: Indonesia, Malaysia, dll"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer"
            >
              {loading ? "Menyimpan..." : "Simpan Author"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
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