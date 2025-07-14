const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fetch = require('node-fetch');

const jobTrendingRoutes = require('./routes/jobTrending');
const jobFixRoutes = require('./routes/jobFix');

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
    const jobs = data.results || [];
    console.log('Data dari Python (contoh):', jobs[0]);

    for (const job of jobs) {
      if (!job.job_title) {
        console.warn('Lewati data karena job_title kosong:', job);
        continue;
      }

      try {
        await pool.query(
          `INSERT INTO job_fix_2 (
            job_title,
            company_name,
            company_location,
            company_size,
            industry_stats,
            job_qualifications,
            job_skills,
            job_skills_1,
            job_type,
            work_hours,
            company_email,
            job_desc
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT DO NOTHING`,
          [
            job.job_title,
            job.company_name ?? null,
            job.company_location ?? null,
            job.company_size ?? null,
            job.industry_stats ?? null,
            job.job_qualifications ?? null,
            job.job_skills ?? null,
            job.job_skills_1 ?? null,
            job.job_type ?? null,
            job.work_hours ?? null,
            job.company_email ?? null,
            job.job_desc ?? null
          ]
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

// Tambahkan route
app.use('/api/job-fix', jobFixRoutes);      
app.use('/api/job-trending', jobTrendingRoutes);

app.listen(PORT, () => {
  console.log(`Node.js backend running on port ${PORT}`);
});
