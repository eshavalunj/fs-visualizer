import React, { useState } from 'react';

const ControlPanel = ({ onAddFile }) => {
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
    <div className="panel">
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

        <button type="submit" className="btn" style={{ marginTop: '8px' }}>
          <svg style={{width:'18px', height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add File
        </button>
      </form>
    </div>
  );
};

export default ControlPanel;
