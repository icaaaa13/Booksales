export default function Hero() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          {/* Badge Pengumuman Toko Buku */}
          <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-indigo-50 rounded-full dark:bg-gray-800 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-gray-700 transition">
            <span className="text-xs bg-indigo-600 rounded-full text-white px-4 py-1.5 mr-3 font-semibold">
              Koleksi Baru
            </span>
            <span className="text-sm font-medium">
              Ribuan Buku Best Seller Telah Hadir!
            </span>
          </div>

          {/* Judul Utama */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Temukan Buku Impianmu di <span className="text-indigo-600 dark:text-indigo-400">BookSales</span>
          </h1>

          {/* Deskripsi */}
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Platform e-commerce manajemen dan penjualan buku terpercaya. Jelajahi berbagai kategori literasi berkualitas untuk memperluas wawasan dan menemani waktu santaimu.
          </p>

          {/* Bagian Partner / Kategori Unggulan */}
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase tracking-wider text-sm">
              Mitra & Penerbit Resmi Kami
            </span>
            <div className="flex flex-wrap justify-center items-center mt-6 gap-8 text-gray-500 dark:text-gray-400 font-semibold">
              <span className="hover:text-indigo-600 transition">Gramedia</span>
              <span className="hover:text-indigo-600 transition">Mizan Publishing</span>
              <span className="hover:text-indigo-600 transition">Elex Media</span>
              <span className="hover:text-indigo-600 transition">Republika</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}