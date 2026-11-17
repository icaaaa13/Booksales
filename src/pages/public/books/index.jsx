import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function PublicBookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books");
      const bookData = response.data.data || response.data.books || response.data;
      setBooks(Array.isArray(bookData) ? bookData : []);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi helper untuk mencocokkan gambar berdasarkan judul buku
  const getBookImage = (title) => {
    switch (title) {
      case "Algoritma dan Pemrograman":
        return "https://images.unsplash.com/photo-1532012197267-da84d127e765";
      case "Seni Menulis Kreatif":
        return "https://images.unsplash.com/photo-1455390582262-044cdead277a";
      case "Jaringan Komputer Lanjut":
        return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5";
      case "Laskar Pelangi":
        return "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
      case "Eccedecianst":
        return "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6";
      case "Santri Pilihan Bunda":
        return "https://images.unsplash.com/photo-1512820790803-83ca734da794";
      case "Atomic Habits":
        return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c";
      case "Bumi Manusia":
        return "https://images.unsplash.com/photo-1495640388908-05fa85288e61";
      default:
        return "https://via.placeholder.com/150";
    }
  };

  // Fungsi helper untuk menentukan harga berbeda di setiap buku
  const getBookPrice = (title) => {
    switch (title) {
      case "Algoritma dan Pemrograman":
        return 85000;
      case "Seni Menulis Kreatif":
        return 65000;
      case "Jaringan Komputer Lanjut":
        return 95000;
      case "Laskar Pelangi":
        return 75000;
      case "Eccedecianst":
        return 88000;
      case "Santri Pilihan Bunda":
        return 79000;
      case "Atomic Habits":
        return 110000;
      case "Bumi Manusia":
        return 99000;
      default:
        return 75000;
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi saat tombol Pesan diklik, membawa data buku beserta harga spesifiknya
  const handleOrder = (book) => {
    const bookWithPrice = {
      ...book,
      price: getBookPrice(book.title),
    };
    navigate("/transactions/create", { state: { selectedBook: bookWithPrice } });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">
            Katalog Buku <span className="text-indigo-400">({filteredBooks.length})</span>
          </h1>
          <input
            type="text"
            placeholder="Cari judul buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 text-lg">
            Memuat data buku...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-lg">
            Buku tidak ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const bookPrice = getBookPrice(book.title);

              return (
                <div
                  key={book.id}
                  className="bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    {/* Render Gambar Sampul Buku Berdasarkan Judul */}
                    <div className="w-full h-44 bg-slate-800 overflow-hidden rounded-lg mb-4">
                      <img
                        src={getBookImage(book.title)}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-1">
                      Penulis: <span className="text-slate-200 font-medium">{book.author?.name || "Tidak diketahui"}</span>
                    </p>
                    <p className="text-sm text-slate-400 mb-3">
                      Tahun: <span className="text-slate-200 font-medium">{book.release_year}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Harga</span>
                      <span className="text-lg font-bold text-indigo-400">
                        Rp {bookPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOrder(book)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}