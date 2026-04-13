import React from 'react';
import './DiskVisualizer.css';

const DiskVisualizer = ({ blocks }) => {
  return (
    <div className="panel disk-container">
      <h2 className="title-gradient" style={{ marginBottom: '16px' }}>Disk Storage grid</h2>
      <div className="disk-grid">
        {blocks.map(block => (
          <div 
            key={block.id} 
            className={`disk-block ${block.isFree ? 'free' : 'allocated'} ${block.type === 'index' ? 'index-block' : ''}`}
            style={{
              backgroundColor: block.isFree ? '' : (block.type === 'index' ? '#333' : block.color),
              borderColor: block.type === 'index' ? block.color : '',
              boxShadow: block.isFree ? '' : `0 0 12px ${block.color}66`
            }}
            title={`Block ${block.id}\n${block.isFree ? 'Free' : 'File ID: ' + block.fileId}${block.type === 'index' ? ' (Index Block)' : ''}${block.next !== null ? '\nNext: ' + block.next : ''}`}
          >
            {block.type === 'index' ? 'IDX' : block.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiskVisualizer;
