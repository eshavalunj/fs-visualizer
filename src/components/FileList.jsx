import React from 'react';

const FileList = ({ files, onDeleteFile }) => {
  return (
    <div className="panel" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '200px', 
      flex: 1,
      overflow: 'hidden' 
    }}>
      <h3 className="title-gradient" style={{ marginBottom: '16px' }}>File Directory</h3>
      <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
        {files.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.85rem', textAlign: 'center', marginTop: '20px' }}>No files allocated.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map(f => (
              <div key={f.id} style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                borderLeft: `3px solid ${f.color}`,
                padding: '10px 12px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    fontSize: '0.9rem', 
                    marginBottom: '2px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {f.strategy} • {f.size} blocks
                  </div>
                </div>
                <button 
                  className="btn btn-danger" 
                  onClick={() => onDeleteFile(f.id)} 
                  style={{ padding: '4px 8px', borderRadius: '6px' }} 
                  title="Remove File"
                >
                  <svg style={{width:'14px', height:'14px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileList;
