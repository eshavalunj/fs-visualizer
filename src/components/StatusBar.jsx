import React from 'react';

const StatusBar = ({ blocks, files }) => {
  const total = blocks.length;
  const used = blocks.filter(b => !b.isFree).length;
  const free = total - used;
  const usedPercentage = total === 0 ? 0 : Math.round((used / total) * 100);

  // Calculate Internal Fragmentation (Sum of wasted space in occupied blocks)
  const internalFragTotal = blocks.reduce((acc, block) => acc + (block.internalFrag || 0), 0).toFixed(2);

  // Calculate External Fragmentation
  // (Total Free Space - Largest Contiguous Free Block)
  let maxContiguous = 0;
  let currentContiguous = 0;
  blocks.forEach(block => {
    if (block.isFree) {
      currentContiguous++;
      if (currentContiguous > maxContiguous) maxContiguous = currentContiguous;
    } else {
      currentContiguous = 0;
    }
  });
  
  const externalFragmentationPotential = (free - maxContiguous).toFixed(0);

  return (
    <div className="panel" style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '16px 24px', overflowX: 'auto' }}>
      <div style={{ minWidth: '180px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Disk Usage</span>
          <span style={{ color: usedPercentage > 85 ? '#ef4444' : 'var(--accent-emerald)' }}>{usedPercentage}%</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${usedPercentage}%`, 
            background: usedPercentage > 85 ? '#ef4444' : 'linear-gradient(90deg, var(--accent-blue), var(--accent-emerald))',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
          }}></div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '32px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Free Pool</div>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--accent-emerald)' }}>{free} <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.7 }}>BLKS</span></div>
        </div>
        
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Internal Frag</div>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: '#f59e0b' }}>{internalFragTotal} <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.7 }}>BLKS</span></div>
        </div>

        <div style={{ textAlign: 'left' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>External Frag</div>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: '#ef4444' }}>{externalFragmentationPotential} <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.7 }}>BLKS</span></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
