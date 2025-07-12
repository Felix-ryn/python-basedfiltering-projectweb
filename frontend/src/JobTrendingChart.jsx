import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function JobTrendingChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5003/api/job-trending')
      .then(res => res.json())
      .then(data => {
        setData({
          labels: data.map(d => d.job_title),
          datasets: [
            {
              label: 'Frekuensi Pekerjaan Direkomendasikan',
              data: data.map(d => Number(d.freq)),
              backgroundColor: 'rgba(236, 64, 122, 0.7)',
              borderRadius: 5,
            }
          ],
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching job trending:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Memuat data tren pekerjaan...</p>;
  if (!data) return <p style={{ textAlign: 'center' }}>Tidak ada data tren.</p>;

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, backgroundColor: '#fff', borderRadius: 12 }}>
      <h2 style={{ color: '#ec407a', textAlign: 'center', marginBottom: 20 }}>Tren Pekerjaan Direkomendasikan</h2>
      <Bar 
        data={data} 
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Top 10 Pekerjaan Terpopuler',
              font: { size: 18 },
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }} 
      />
    </div>
  );
}
