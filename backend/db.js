const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'karso_db',
  password: 'agusta24@', // isi sesuai konfigurasi Postgres kamu
  port: 5432,
});

module.exports = pool;
