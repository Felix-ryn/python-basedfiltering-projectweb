import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TrendingChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5003/api/trending')
      .then(res => res.json())
      .then(data => {
        setData({
          labels: data.map(d => d.search_text),
          datasets: [
            {
              label: 'Frekuensi Pencarian',
              data: data.map(d => Number(d.freq)),
              backgroundColor: 'rgba(236, 64, 122, 0.7)'
            }
          ]
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat data tren pencarian...</p>;
  if (!data) return <p>Tidak ada data tren.</p>;

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, backgroundColor: '#fff', borderRadius: 12 }}>
      <h2 style={{ color: '#ec407a', textAlign: 'center' }}>Tren Pencarian Pekerjaan</h2>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
}
