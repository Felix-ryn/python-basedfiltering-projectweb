const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fetch = require('node-fetch');

const jobTrendingRoutes = require('./routes/jobTrending');
const jobDataRoutes = require('./routes/jobData');

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'karso_db',
  password: 'agusta24@',
  port: 5432,
});

// Tambahkan pool ke req agar bisa dipakai di route lain
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Endpoint pencarian dan integrasi dengan Python microservice
app.post('/api/search', async (req, res) => {
  const { description } = req.body;

  if (!description || description.trim() === '') {
    return res.status(400).json({ error: 'Deskripsi pencarian wajib diisi' });
  }

  try {
    const response = await fetch('http://127.0.0.1:5004/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      const errData = await response.json();
      return res.status(500).json({ error: errData.message || 'Error dari Python microservice' });
    }

    const data = await response.json();
    const jobTitles = data.results ? data.results.map(job => job.job_title) : [];

    for (const title of jobTitles) {
      try {
        await pool.query(
          'INSERT INTO job_fix_2 (job_title) VALUES ($1) ON CONFLICT DO NOTHING',
          [title]
        );
      } catch (err) {
        console.error('Insert gagal:', err.message);
      }
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan di server' });
  }
});

// Tambahkan route untuk job data dan job trending
app.use('/api/job-data', jobDataRoutes);      // Endpoint untuk Python ambil data
app.use('/api/job-trending', jobTrendingRoutes);

app.listen(PORT, () => {
  console.log(`Node.js backend running on port ${PORT}`);
});
