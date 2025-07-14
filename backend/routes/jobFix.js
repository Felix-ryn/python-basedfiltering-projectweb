const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await req.pool.query('SELECT * FROM job_fix_2');
    res.json(result.rows);
  } catch (err) {
    console.error('Gagal ambil data job_fix_2:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

module.exports = router;
