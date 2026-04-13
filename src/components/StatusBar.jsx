import React from 'react';

const StatusBar = ({ blocks }) => {
  const total = blocks.length;
  const used = blocks.filter(b => !b.isFree).length;
  const free = total - used;
  const usedPercentage = total === 0 ? 0 : Math.round((used / total) * 100);

  return (
    <div className="panel" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '16px 24px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
          <span>Disk Usage</span>
          <span style={{ color: usedPercentage > 85 ? '#ef4444' : 'var(--accent-emerald)' }}>{usedPercentage}%</span>
        </div>
        <div style={{ height: '8px', background: 'var(--block-free)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${usedPercentage}%`, 
            background: usedPercentage > 85 ? '#ef4444' : 'linear-gradient(90deg, var(--accent-blue), var(--accent-emerald))',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }}></div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Total</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{total}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Used</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--accent-blue)' }}>{used}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Free</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>{free}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
