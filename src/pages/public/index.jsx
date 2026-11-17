
import Books from "./books/index";

export default function Home() {
  return (
    <div className="scroll-smooth">
      {/* 1. Bagian Home / Hero */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gray-900 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Temukan Buku Impianmu di <span className="text-indigo-400">BookSales</span>
        </h1>
        <p className="text-gray-400 max-w-xl text-lg mb-6">
          Platform e-commerce manajemen dan penjualan buku terpercaya. Jelajahi berbagai kategori literasi berkualitas.
        </p>
      </section>

      {/* 2. Bagian Katalog Buku */}
      <section id="books" className="min-h-screen py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">Katalog Buku</h2>
          <Books />
        </div>
      </section>

      {/* 3. Bagian About */}
      <section id="about" className="min-h-screen py-16 px-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
            Tentang BookSales
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            <strong className="text-indigo-600 dark:text-indigo-400">BookSales</strong> adalah platform e-commerce manajemen dan penjualan buku terpercaya. Kami berkomitmen untuk menyediakan akses literasi berkualitas bagi semua kalangan.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Misi utama kami adalah menjembatani antara penerbit, penulis, dan para pencinta buku melalui sistem transaksi yang cepat, aman, dan mudah digunakan.
          </p>
        </div>
      </section>

      {/* 4. Bagian Contact */}
      <section id="contact" className="min-h-screen py-16 px-6 bg-white dark:bg-gray-800 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Hubungi Kami</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Punya pertanyaan, kendala, atau masukan? Silakan kirimkan pesan kepada tim kami.
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("Pesan berhasil dikirim!"); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama anda" className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" placeholder="nama@email.com" className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan</label>
              <textarea rows="4" placeholder="Tulis pesan anda di sini..." className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" required></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition">
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}