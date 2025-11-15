import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nama: 'Pengguna', role: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const payload = jwtDecode(token);
      setUser({
        nama: payload.nama || payload.name || payload.username || 'Pengguna',
        role: payload.role || '',
      });
    } catch {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    const ok = window.confirm('Yakin ingin logout?');
    if (!ok) return;
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      
      {/* HEADER BARU */}
      <header className="w-full bg-white shadow-sm border-b fixed top-0 left-0 z-20">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-xl font-bold text-indigo-700">Dashboard Presensi</h1>
              <p className="text-xs text-gray-500">
                Kelola presensi dan laporan
              </p>
            </div>

            <nav className="hidden md:flex items-center gap-4 ml-6">
              <button onClick={() => navigate('/dashboard')} className="text-sm text-gray-600 hover:text-indigo-700">
                Home
              </button>
              <button onClick={() => navigate('/presensi')} className="text-sm text-gray-600 hover:text-indigo-700">
                Presensi
              </button>
              <button onClick={() => navigate('/reports')} className="text-sm text-gray-600 hover:text-indigo-700">
                Laporan
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 hidden sm:block">
              Halo, <span className="font-semibold">{user.nama}</span>
            </div>

            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pt-28 pb-12">
        <div className="max-w-screen-xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <section className="p-6 rounded-lg bg-white border">
              <h2 className="text-lg font-medium text-gray-700">Presensi Hari Ini</h2>
              <div className="mt-4">
                <div className="h-2 w-12 bg-purple-600 rounded-sm"></div>
                <p className="mt-4 text-sm text-gray-600">Tidak ada data terbaru</p>
              </div>
            </section>

            {/* CARD 2 */}
            <section className="p-6 rounded-lg bg-white border">
              <h2 className="text-lg font-medium text-gray-700">Laporan Mingguan</h2>
              <div className="mt-4">
                <div className="h-2 w-12 bg-indigo-600 rounded-sm"></div>
                <p className="mt-4 text-sm text-gray-600">Gunakan menu laporan untuk melihat detail</p>
              </div>
            </section>

            {/* CARD 3 */}
            <section className="p-6 rounded-lg bg-white border">
              <h2 className="text-lg font-medium text-gray-700">Aksi Cepat</h2>
              <div className="mt-4 flex flex-col gap-3">

                <button
                  onClick={() => navigate('/presensi')}
                  className="py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Buka Presensi
                </button>

                <button
                  onClick={() => navigate('/reports/daily')}
                  className="py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Lihat Laporan
                </button>

              </div>
            </section>
          </div>

          {/* FOOTER TIP */}
          <div className="mt-8 p-4 rounded-lg border-dashed border bg-white text-sm text-gray-600">
            Tip: Klik menu di header untuk navigasi cepat.
          </div>

        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
