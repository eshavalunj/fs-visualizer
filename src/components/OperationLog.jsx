import React, { useEffect, useRef } from 'react';

const OperationLog = ({ logs }) => {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="panel log-container" style={{ display: 'flex', flexDirection: 'column', height: '220px' }}>
      <h3 className="title-gradient" style={{ marginBottom: '12px', fontSize: '1.1rem' }}>System Operation Logs</h3>
      <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '8px' }}>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)' }}>System initialized. Waiting for operations...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ 
              marginBottom: '8px', 
              color: log.type === 'error' ? '#ef4444' : (log.type === 'success' ? '#38bdf8' : 'var(--text-primary)'),
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.4'
            }}>
              <span style={{ color: 'var(--text-secondary)', marginRight: '10px' }}>[{log.time}]</span>
              {log.message}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default OperationLog;
