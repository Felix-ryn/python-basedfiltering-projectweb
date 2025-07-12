import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function SearchPage() {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    navigate('/results', { state: { description } });
  };

  return (
    <div className="app-container">
      <div className="hero-section">
        <div className="hero-text" style={{ marginTop: '1px' }}>
          <img 
            src="/work.png" 
            alt="Women Illustration" 
            style={{ width: '300px', marginBottom: '1px' }} 
          />
          <h1>Kami Sedang Mencari!</h1>
          
         <p style={{ color: '#1a237e' }}>
          Ayo gabung bersama ribuan pencari kerja lainnya dan temukan peluang terbaik
          untuk masa depan kariermu bersama KARSO.
          </p>

          
          <button
            className="btn-custom mt-3"
            onClick={() => document.getElementById('form').scrollIntoView({ behavior: 'smooth' })}
          >
            Mulai Cari Kerja
          </button>
        </div>
        <div className="image-wrapper">
          <div className="side-images">
            {/* <img src="/cewe.png" alt="Cewe" className="side-image" />
            <img src="/laki.png" alt="Laki" className="side-image" /> */}
          </div>
          <img 
            src="/hero-illustration.png" 
            alt="Ilustrasi Karir" 
            className="hero-image" 
          />
        </div>
      </div>

      {/* Bagian form dengan background sama seperti hero-section */}
      <div id="form" className="form-section">
        <div className="form-container">
          <h2 className="form-heading">Cari Pekerjaan Impianmu 💼</h2>
          <p className="form-description">Masukkan deskripsi pekerjaan yang kamu inginkan</p>
          <form onSubmit={handleSubmit}>
            <label className="form-label">Deskripsi pekerjaan</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Contoh: UI designer, kerja remote, startup"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit" className="btn-search mt-2">
              🔍 MENCARI
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
