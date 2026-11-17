import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../_api";

export default function GenreEdit() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await API.get(`/genres/${id}`);
        const data = response.data.data || response.data;
        setName(data.name);
      } catch (error) {
        console.error("Gagal mengambil data genre:", error);
      }
    };
    fetchGenre();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/genres/${id}`, { name });
      alert("Genre berhasil diperbarui!");
      navigate("/admin/genres");
    } catch (error) {
      console.error("Gagal memperbarui genre:", error);
      alert("Terjadi kesalahan saat memperbarui genre.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Genre
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Genre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              {loading ? "Menyimpan..." : "Perbarui Genre"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
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