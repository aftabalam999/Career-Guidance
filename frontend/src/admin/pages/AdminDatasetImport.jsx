import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminDatasetImport = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { showToast } = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setStatus(null);
    } else {
      showToast("Please select a valid CSV file", "error");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { 
        headers: { 
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      const { data } = await axios.post('/api/admin/import-colleges', formData, config);
      setStatus({ type: 'success', message: data.message });
      showToast(data.message, "success");
      setFile(null);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || "Import failed" });
      showToast("Import failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Dataset Import</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Upload college datasets in bulk using CSV files.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Upload size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Upload CSV File</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', marginBottom: '2rem' }}>
            Select a .csv file containing college data.<br/>Headers must include: <b>name, location, fees, placement, ranking</b>
          </p>
          
          <input 
            type="file" 
            id="csv-upload" 
            accept=".csv" 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          
          <label 
            htmlFor="csv-upload" 
            className="btn-outline" 
            style={{ cursor: 'pointer', padding: '0.8rem 2rem' }}
          >
            {file ? file.name : "Select CSV File"}
          </label>

          {file && (
            <button 
              onClick={handleUpload}
              disabled={loading}
              className="btn-primary" 
              style={{ marginTop: '1.5rem', width: '200px' }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Start Import"}
            </button>
          )}
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} style={{ color: 'var(--color-primary)' }} /> Import Guidelines
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '1.25rem' }}>
            <li>Ensure the file is encoded in <b>UTF-8</b>.</li>
            <li>Colleges with duplicate names will be created as new entries.</li>
            <li><b>Placement</b> and <b>Ranking</b> must be numeric values.</li>
            <li>Missing <b>feesRange</b> will be left blank.</li>
            <li>Maximum file size allowed is <b>5MB</b>.</li>
          </ul>

          {status && (
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '12px', backgroundColor: status.type === 'success' ? '#ECFDF5' : '#FEF2F2', border: `1px solid ${status.type === 'success' ? '#10B981' : '#EF4444'}`, display: 'flex', gap: '1rem' }}>
               {status.type === 'success' ? <CheckCircle2 color="#10B981" /> : <AlertCircle color="#EF4444" />}
               <div>
                  <p style={{ margin: 0, fontWeight: '700', color: status.type === 'success' ? '#065F46' : '#991B1B' }}>
                    {status.type === 'success' ? 'Import Successful' : 'Import Partially Failed'}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: status.type === 'success' ? '#059669' : '#B91C1C' }}>
                    {status.message}
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDatasetImport;
