import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

export default function JobDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    navigate('/results');
    return null;
  }

  return (
    <div className="app-container job-detail-container">
      <button onClick={() => navigate(-1)} className="btn-back" style={{ marginBottom: '20px' }}>
         Kembali ke Hasil
      </button>

      <h2 className="detail-title">{job.job_title}</h2>

      <div className="detail-info">
        <p><strong>Perusahaan:</strong> {job.company_name || 'Tidak tersedia'}</p>
        <p><strong>Lokasi:</strong> {job.company_location || 'Tidak tersedia'}</p>
        <p><strong>Email:</strong> {job.company_email || 'Tidak tersedia'}</p>
        <p><strong>Ukuran Perusahaan:</strong> {job.company_size || 'Tidak tersedia'}</p>
        <p><strong>Jam Kerja:</strong> {job.work_hours || 'Tidak tersedia'}</p>
      </div>

      <div className="detail-section">
        <h3>Kualifikasi</h3>
        <p>{job.job_qualifications || 'Tidak tersedia'}</p>
      </div>

      <div className="detail-section">
        <h3>Deskripsi Pekerjaan</h3>
        <p>{job.job_desc || 'Tidak tersedia'}</p>
      </div>
    </div>
  );
}
