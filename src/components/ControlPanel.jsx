import React, { useState } from 'react';

const ControlPanel = ({ onAddFile, policy, setPolicy, handleCompact }) => {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(5);
  const [strategy, setStrategy] = useState('Contiguous');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    onAddFile(fileName, Number(fileSize), strategy);
    setFileName('');
  };

  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 className="title-gradient" style={{ marginBottom: '16px' }}>Allocate Memory</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="form-group">
            <label>File Name</label>
            <input 
              className="input-field" 
              type="text" 
              value={fileName} 
              onChange={e => setFileName(e.target.value)} 
              placeholder="e.g. core.sys" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Size (Blocks)</label>
            <input 
              className="input-field" 
              type="number" 
              min="1" 
              max="200" 
              value={fileSize} 
              onChange={e => setFileSize(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Allocation Strategy</label>
            <select className="input-field" value={strategy} onChange={e => setStrategy(e.target.value)}>
              <option value="Contiguous">Contiguous</option>
              <option value="Linked">Linked</option>
              <option value="Indexed">Indexed</option>
            </select>
          </div>

          {strategy === 'Contiguous' && (
            <div className="form-group" style={{ animation: 'fadeIn 0.3s ease' }}>
              <label>Partition Policy</label>
              <select className="input-field" value={policy} onChange={e => setPolicy(e.target.value)}>
                <option value="First Fit">First Fit</option>
                <option value="Best Fit">Best Fit</option>
                <option value="Worst Fit">Worst Fit</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn" style={{ marginTop: '8px' }}>
            <svg style={{width:'18px', height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add File
          </button>
        </form>
      </div>

      <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>OS Maintenance</h4>
        <button 
          onClick={handleCompact} 
          className="btn" 
          style={{ 
            width: '100%', 
            background: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid rgba(59, 130, 246, 0.2)',
            color: 'var(--accent-blue)' 
          }}
        >
          <svg style={{width:'18px', height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Compact Memory
        </button>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px', fontStyle: 'italic' }}>
          Removes external fragmentation by shifting occupied blocks.
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
