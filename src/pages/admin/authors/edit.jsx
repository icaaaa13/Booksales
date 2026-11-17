import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../_api";

export default function AuthorEdit() {
  const [formData, setFormData] = useState({ name: "", country: "" });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await API.get(`/authors/${id}`);
        const data = response.data.data || response.data;
        setFormData({ name: data.name, country: data.country || "" });
      } catch (error) {
        console.error("Gagal mengambil data penulis:", error);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/authors/${id}`, formData);
      alert("Penulis berhasil diperbarui!");
      navigate("/admin/authors");
    } catch (error) {
      console.error("Gagal memperbarui penulis:", error);
      alert("Terjadi kesalahan saat memperbarui penulis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Penulis
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Penulis
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Genre
              </label>
              <input
             type="text"
             name="genre" 
             value={formData.genre}
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
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              {loading ? "Menyimpan..." : "Perbarui Penulis"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
              className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-750 dark:text-gray-300 dark:border-gray-500"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}