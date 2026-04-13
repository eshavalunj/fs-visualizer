import React from 'react';

const FileList = ({ files, onDeleteFile }) => {
  return (
    <div className="panel" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <h3 className="title-gradient" style={{ marginBottom: '16px' }}>File Directory</h3>
      <div style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '8px' }}>
        {files.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', marginTop: '20px' }}>No files allocated.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {files.map(f => (
              <div key={f.id} style={{ 
                background: 'rgba(15, 23, 42, 0.4)', 
                borderLeft: `4px solid ${f.color}`,
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {f.strategy} • {f.size} block{f.size > 1 ? 's' : ''}
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => onDeleteFile(f.id)} style={{ padding: '6px 12px', fontSize: '0.8rem' }} title="Remove File">
                  <svg style={{width:'16px', height:'16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
