const express = require('express');
const router = express.Router();
const pool = require('../db'); // Pastikan ini sudah ada dan benar

// Endpoint untuk mengambil 10 pencarian terpopuler
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT search_text, COUNT(*) as freq
      FROM job_fix_2
      GROUP BY search_text
      ORDER BY freq DESC
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trending searches:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
