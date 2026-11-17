import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../_api";

export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    publisher: "",
    release_year: "",
  });
  const [loading, setLoading] = useState(false);

  // Ambil data buku yang akan diedit dan daftar authors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, authorRes] = await Promise.all([
          API.get(`/books/${id}`),
          API.get("/authors"),
        ]);
        
        const bookData = bookRes.data.data || bookRes.data;
        setFormData({
          title: bookData.title || "",
          author_id: bookData.author_id || "",
          publisher: bookData.publisher || "",
          release_year: bookData.release_year || "",
        });

        setAuthors(authorRes.data.data || authorRes.data || []);
      } catch (error) {
        console.error("Gagal memuat data untuk diedit:", error);
      }
    };
    fetchData();
  }, [id]);

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
      await API.put(`/books/${id}`, formData);
      alert("Buku berhasil diperbarui!");
      navigate("/admin/books");
    } catch (error) {
      console.error("Gagal memperbarui buku:", error);
      alert("Terjadi kesalahan saat memperbarui buku.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Buku #{id}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Judul Buku
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Penulis (Author)
              </label>
              <select
                id="author_id"
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Pilih Penulis</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="release_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tahun Rilis
              </label>
              <input
                type="number"
                name="release_year"
                id="release_year"
                value={formData.release_year}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Penerbit
              </label>
              <input
                type="text"
                name="publisher"
                id="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              {loading ? "Menyimpan..." : "Perbarui Buku"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 dark:bg-gray-750 dark:text-gray-300 dark:border-gray-500"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}