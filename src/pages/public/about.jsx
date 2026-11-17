export default function About() {
  return (
    <div className="min-h-[75vh] bg-gray-50 dark:bg-gray-900 py-12 px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
          Tentang BookSales
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          <strong className="text-indigo-600 dark:text-indigo-400">BookSales</strong> adalah platform e-commerce manajemen dan penjualan buku terpercaya. Kami berkomitmen untuk menyediakan akses literasi berkualitas bagi semua kalangan, mulai dari buku-buku best seller, edukasi, hingga pengembangan diri.
        </p>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Misi utama kami adalah menjembatani antara penerbit, penulis, dan para pencinta buku melalui sistem transaksi yang cepat, aman, dan sangat mudah digunakan oleh siapa saja.
        </p>
      </div>
    </div>
  );
}