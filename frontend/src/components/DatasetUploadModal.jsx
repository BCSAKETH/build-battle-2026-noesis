import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Cpu,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import { supabase } from '../supabase';

export default function DatasetUploadModal({ isOpen, onClose, onUploadSuccess, apiBase }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please select a valid .csv dataset file.');
      return;
    }
    setErrorMessage(null);
    setSelectedFile(file);
    setUploadResult(null);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Fetch Supabase session token if logged in
      const { data: { session } } = await supabase.auth.getSession();
      const headers = {};
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const res = await fetch(`${apiBase}/api/upload`, {
        method: 'POST',
        headers,
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to upload and parse dataset.');
      }

      const data = await res.json();
      setUploadResult(data);
      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      console.error('Dataset upload error:', err);
      setErrorMessage(err.message || 'Error uploading dataset. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '580px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              background: '#eef2ff',
              border: '1px solid #c7d2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UploadCloud size={18} color="#4f46e5" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                Ingest Custom Feedback Dataset
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Zero-Hardcoded Schema • Groq Llama-3 Auto-Mapping
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '0.35rem',
              borderRadius: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.75rem' }}>
          {!uploadResult ? (
            <>
              {/* Dropzone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragActive ? '#4f46e5' : '#cbd5e1'}`,
                  borderRadius: '12px',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  background: dragActive ? '#f5f3ff' : '#f8fafc',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <UploadCloud size={24} color="#4f46e5" />
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                  {selectedFile ? selectedFile.name : 'Click to upload or drag & drop CSV'}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(1)} KB • Ready for Groq Auto-Mapping`
                    : 'Upload any raw customer feedback CSV (e.g. Zendesk, Intercom, App Store)'}
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: '#fff1f2',
                  border: '1px solid #fecdd3',
                  color: '#e11d48',
                  fontSize: '0.82rem',
                  marginTop: '1rem'
                }}>
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!selectedFile || isUploading}
                  onClick={handleUploadSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '8px',
                    border: '1px solid #4338ca',
                    background: selectedFile && !isUploading ? '#4f46e5' : '#a5b4fc',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: selectedFile && !isUploading ? 'pointer' : 'not-allowed',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                  }}
                >
                  {isUploading ? (
                    <>
                      <Cpu size={16} className="spin-icon" />
                      <span>Groq Auto-Mapping...</span>
                    </>
                  ) : (
                    <>
                      <span>Parse & Ingest Dataset</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Upload Success & Groq Mapping Visualizer */
            <div>
              <div style={{
                textAlign: 'center',
                padding: '1.25rem 0',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem'
                }}>
                  <CheckCircle2 size={24} color="#10b981" />
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0f172a' }}>
                  Dataset Successfully Ingested!
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>
                  {uploadResult.total_records.toLocaleString()} customer records analyzed and synchronized to Supabase Cloud.
                </p>
              </div>

              {/* Groq Auto-Mapping Schema Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1rem',
                margin: '1.25rem 0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#4f46e5' }}>
                    Groq Llama-3 Dynamic Schema Mapping
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    background: '#eef2ff',
                    color: '#4f46e5',
                    fontWeight: 700
                  }}>
                    {uploadResult.groq_provider}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Feedback Text Column</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                      {uploadResult.column_mapping.feedback_text || 'Inferred'}
                    </div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Category Column</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                      {uploadResult.column_mapping.category || 'Inferred'}
                    </div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Timestamp Column</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                      {uploadResult.column_mapping.timestamp || 'Auto-generated'}
                    </div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Tenant Scope</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>
                      Supabase Cloud Sync
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Open Ingested Dataset in Workspace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
