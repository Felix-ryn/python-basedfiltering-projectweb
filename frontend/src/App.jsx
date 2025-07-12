import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SearchPage from './SearchPage';
import ResultPage from './ResultPage';
import JobDetailPage from './JobDetailPage';
import TrendingPage from './TrendingPage';

// Navbar dengan logo gambar
function Navbar() {
  return (
   <nav style={{
  width: '100%',         // Lebar penuh (default)
  height: '50px',
  maxWidth: '1200px',    // Lebar maksimal navbar (misal 1200px)
  margin: '0 auto',      // Pusatkan navbar ketika maxWidth aktif
  padding: '1px 30px',
  backgroundColor: '#2196f3',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 1px 11px rgba(33, 150, 243, 0.3)'
}}>

      <Link 
        to="/" 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <img 
          src="/logo.png"              // Pastikan logo.png ada di folder public
          alt="Logo KARSO" 
          style={{ height: '60px' }}  // Sesuaikan ukuran logo
        />
      </Link>

      <Link 
        to="/trending"
        className="btn-custom"
        style={{
          marginLeft: 'auto',
          padding: '8px 20px',
          borderRadius: '30px',
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#1565c0'}
        onMouseLeave={e => e.target.style.backgroundColor = '#1976d2'}
      >
        Tren Pencarian
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/job-detail" element={<JobDetailPage />} />
        <Route path="/trending" element={<TrendingPage />} />
      </Routes>
    </Router>
  );
}


