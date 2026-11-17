import { useState, useEffect } from "react";
import API from "../../../_api"; // Sesuaikan path relative ke file _api.js Anda

export default function UsersIndex() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data users dari API Laravel
  const fetchUsers = async () => {
    try {
      const response = await API.get("/users"); // Sesuaikan endpoint route di Laravel Anda
      // Jika data dibungkus di dalam response.data.data atau langsung response.data
      setUsers(response.data.data || response.data);
    } catch (error) {
      console.error("Gagal memuat data users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-white">Daftar Pengguna (Users)</h1>
      
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama Pengguna</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Tanggal Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-white">Memuat data...</td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="px-6 py-4">#{user.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  Belum ada data pengguna di database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}