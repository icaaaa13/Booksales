import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  const fetchBookDetail = async () => {
    try {
      const response = await API.get(`/books/${id}`);
      setBook(response.data.data || response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil detail buku:", error);
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Gagal melakukan transaksi. Pastikan Anda sudah login.");
        navigate("/login");
        return;
      }

      // Ambil data user dari localStorage (jika Anda menyimpannya saat login)
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      // Generate order number unik
      const generatedOrderNumber = `ORD-${Date.now()}`;

      await API.post(
        "/transactions",
        {
          book_id: book.id,
          total_amount: book.price || 50000,
          order_number: generatedOrderNumber,
          customer_id: user ? user.id : null, // Mengirimkan ID user yang sedang login
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaksi Berhasil!");
      navigate("/transactions");
    } catch (error) {
      console.error("Gagal melakukan transaksi:", error);
      alert(
        error.response?.data?.message || 
        JSON.stringify(error.response?.data?.errors) || 
        "Gagal melakukan transaksi."
      );
    }
  };
  if (loading) {
    return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Memuat detail buku...</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Buku tidak ditemukan.</div>;
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Gambar Buku */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full rounded-lg shadow-md object-cover h-[450px]"
              src={book.image || "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"}
              alt={book.title}
            />
          </div>

          {/* Informasi Buku */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
              {book.title}
            </h1>
            
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                Rp {book.price ? Number(book.price).toLocaleString("id-ID") : "50.000"}
              </p>
            </div>

            {/* Tombol Beli / Add to cart */}
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                onClick={handleBuy}
                type="button"
                className="text-white mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-3 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center cursor-pointer shadow-md"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Beli Buku Ini (Checkout)
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <div className="space-y-4 text-gray-500 dark:text-gray-400">
              <p>
                <strong className="text-gray-900 dark:text-white">Tahun Terbit:</strong> {book.release_year || "-"}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Penulis (Author):</strong> {book.author ? book.author.name : "Penulis Terdaftar"}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Kategori (Genre):</strong> {book.genre ? book.genre.name : "Umum"}
              </p>
              <p className="pt-2">
                Buku berkualitas tinggi yang dirancang untuk memperluas wawasan dan referensi bacaan terbaik Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}