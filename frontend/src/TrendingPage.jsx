import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendingPage() {
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5003/api/job-trending') // Ganti sesuai backend
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data tren');
        return res.json();
      })
      .then((data) => {
        const chartData = {
          labels: data.map(item => item.job_title),
          datasets: [
            {
              label: 'Frekuensi Pekerjaan Dicari',
              data: data.map(item => Number(item.freq)),
              fill: false,
              borderColor: 'rgba(25, 118, 210, 0.7)', // Biru muda
              backgroundColor: 'rgba(25, 118, 210, 0.7)',
              tension: 0.3,
            },
          ],
        };
        setTrendData(chartData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Memuat data tren...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  if (!trendData) return null;

  return (
    <div style={{
      maxWidth: 700,
      margin: '20px auto',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
    }}>
      {/* Tombol Kembali */}
      <div style={{ textAlign: 'left', marginBottom: 20 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: '10px 25px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#1565c0'}
          onMouseLeave={e => e.target.style.backgroundColor = '#1976d2'}
        >
          Kembali
        </button>
      </div>

      <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: 20 }}>
        Tren Pekerjaan Direkomendasikan
      </h2>

      <Line
        data={trendData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: false,   // <-- Judul grafik dihilangkan dengan display: false
              // text: 'Frekuensi Pekerjaan Direkomendasikan', // dihapus
              // font: { size: 18 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        }}
      />
    </div>
  );
}
