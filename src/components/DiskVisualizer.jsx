import React from 'react';
import './DiskVisualizer.css';

const DiskVisualizer = ({ blocks }) => {
  return (
    <div className="panel disk-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="title-gradient">Disk Storage Grid</h2>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--block-free)', border: '1px solid rgba(255,255,255,0.1)' }}></div>
            <span style={{ color: 'var(--text-secondary)' }}>Free</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', background: '#3b82f6' }}></div>
            <span style={{ color: 'var(--text-secondary)' }}>Used</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '1px', background: '#f59e0b', boxShadow: '0 0 4px #f59e0b' }}></div>
            <span style={{ color: 'var(--text-secondary)' }}>Frag</span>
          </div>
        </div>
      </div>
      <div className="disk-grid">
        {blocks.map(block => (
          <div 
            key={block.id} 
            className={`disk-block ${block.isFree ? 'free' : 'allocated'} ${block.type === 'index' ? 'index-block' : ''}`}
            style={{
              backgroundColor: block.isFree ? '' : (block.type === 'index' ? '#333' : block.color),
              borderColor: block.type === 'index' ? block.color : '',
              boxShadow: block.isFree ? '' : `0 0 12px ${block.color}66`,
              position: 'relative',
              overflow: 'hidden'
            }}
            title={`Block ${block.id}\n${block.isFree ? 'Free' : 'File ID: ' + block.fileId}${block.type === 'index' ? ' (Index Block)' : ''}${block.next !== null ? '\nNext: ' + block.next : ''}${block.internalFrag ? '\nInternal Frag: ' + block.internalFrag.toFixed(2) + ' blks' : ''}`}
          >
            {block.type === 'index' ? 'IDX' : block.id}
            
            {/* Visual Internal Fragmentation Indicator */}
            {!block.isFree && block.internalFrag > 0 && (
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '100%', 
                  height: `${block.internalFrag * 100}%`, 
                  background: 'rgba(245, 158, 11, 0.6)', // Orange highlight for fragmentation
                  borderTop: '1px solid #f59e0b'
                }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiskVisualizer;
