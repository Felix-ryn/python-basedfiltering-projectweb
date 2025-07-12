import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const description = location.state?.description || '';

  const [results, setResults] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!description) {
      navigate('/');
      return;
    }

    async function fetchResults() {
      setLoading(true);
      setMessage('');
      setResults([]);
      setJobTypes([]);

      try {
        const res = await fetch('http://localhost:5003/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error pencarian');

        if (data.message) setMessage(data.message);
        if (data.results) setResults(data.results);
        if (data.job_types) setJobTypes(data.job_types);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [description, navigate]);

  const filteredResults = filter === 'All' ? results : results.filter(r => r.job_type === filter);

  return (
    <div className="app-container result-container">
      

      <h2 className="result-title">Hasil Rekomendasi Pekerjaan</h2>

      {loading && <p className="loading-text">Loading...</p>}
      {message && <p className="form-message">{message}</p>}

      {jobTypes.length > 0 && (
        <div className="filter-container">
          <label htmlFor="filter" className="filter-label">Filter Jenis Kerja:</label>
          <select
            id="filter"
            className="filter-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">Semua</option>
            {jobTypes.map((jt, i) => (
              <option key={i} value={jt}>{jt}</option>
            ))}
          </select>
        </div>
      )}

      <div className="job-list-scroll">
        {filteredResults.length > 0 ? (
          filteredResults.map((job, i) => (
            <div key={i} className="job-card">
              <h3
                onClick={() => navigate('/job-detail', { state: { job } })}
                className="job-title clickable"
                title="Klik untuk lihat detail pekerjaan"
              >
                {job.job_title}
              </h3>
              <div className="job-info-container">
                <div className="job-info-row">
                  <span className="job-info-label">Perusahaan :</span>
                  <span className="job-info-value">{job.company_name || '-'}</span>
                </div>
                <div className="job-info-row">
                  <span className="job-info-label">Lokasi :</span>
                  <span className="job-info-value">{job.company_location || '-'}</span>
                </div>
                <div className="job-info-row">
                  <span className="job-info-label">Email :</span>
                  <span className="job-info-value">{job.company_email || '-'}</span>
                </div>
                <div className="job-info-row">
                  <span className="job-info-label">Skor Kecocokan :</span>
                  <span className="job-info-value">{(job.score * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">Tidak ada hasil pencarian.</p>
        )}
      </div>

      <div className="back-button-container">
        <button
          onClick={() => navigate('/')}
          className="btn-back"
        >
           Kembali
        </button>
      </div>
    </div>
  );
}
