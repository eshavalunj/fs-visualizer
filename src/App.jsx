import React, { useState, useEffect } from 'react';
import './App.css';
import DiskVisualizer from './components/DiskVisualizer';
import ControlPanel from './components/ControlPanel';
import FileList from './components/FileList';
import StatusBar from './components/StatusBar';
import OperationLog from './components/OperationLog';
import InteractiveWaveShader from './components/ui/flowing-waves-shader';
import { allocateContiguous, allocateLinked, allocateIndexed, getRandomColor } from './utils/allocationAlgorithms';

const TOTAL_BLOCKS = 300; // Simulating a wider disk grid

function App() {
  const [blocks, setBlocks] = useState([]);
  const [files, setFiles] = useState([]);
  const [logs, setLogs] = useState([]);

  // Initialize disk
  useEffect(() => {
    const initialBlocks = Array.from({ length: TOTAL_BLOCKS }, (_, i) => ({
      id: i,
      isFree: true,
      fileId: null,
      type: 'data',
      next: null,
      color: null
    }));
    setBlocks(initialBlocks);
    addLog('System', `Disk formatted. Total capacity: ${TOTAL_BLOCKS} blocks.`);
  }, []);

  const addLog = (type, message) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { time, type, message }]);
  };

  const handleAddFile = (name, size, strategy) => {
    if (size > TOTAL_BLOCKS) {
      addLog('error', `ERR: Cannot allocate ${size} blocks. Max capacity is ${TOTAL_BLOCKS}.`);
      return;
    }
    if (files.find(f => f.name === name)) {
      addLog('error', `ERR: File '${name}' already exists in directory.`);
      return;
    }

    const color = getRandomColor();
    let allocationIds = null;
    let indexBlockId = null;

    if (strategy === 'Contiguous') {
      allocationIds = allocateContiguous(blocks, size);
    } else if (strategy === 'Linked') {
      allocationIds = allocateLinked(blocks, size);
    } else if (strategy === 'Indexed') {
      const result = allocateIndexed(blocks, size);
      if (result) {
        indexBlockId = result.indexBlockId;
        allocationIds = result.dataBlockIds;
      }
    }

    if (!allocationIds) {
      addLog('error', `ERR: Allocation failed for '${name}'. Not enough space using ${strategy} algorithm. External fragmentation likely.`);
      return;
    }

    const fileId = `F${files.length + 1}`;
    
    setBlocks(prev => {
      const newBlocks = [...prev];
      if (strategy === 'Contiguous' || strategy === 'Linked') {
        allocationIds.forEach((blockId, i) => {
          newBlocks[blockId] = {
            ...newBlocks[blockId],
            isFree: false,
            fileId,
            type: 'data',
            color,
            next: strategy === 'Linked' && i < allocationIds.length - 1 ? allocationIds[i + 1] : null
          };
        });
      } else if (strategy === 'Indexed') {
        newBlocks[indexBlockId] = {
          ...newBlocks[indexBlockId],
          isFree: false,
          fileId,
          type: 'index',
          color,
          next: null
        };
        allocationIds.forEach(blockId => {
          newBlocks[blockId] = {
            ...newBlocks[blockId],
            isFree: false,
            fileId,
            type: 'data',
            color,
            next: null
          };
        });
      }
      return newBlocks;
    });

    const newFile = {
      id: fileId,
      name,
      size,
      strategy,
      color,
      blocksAllocated: strategy === 'Indexed' ? [...allocationIds, indexBlockId] : allocationIds
    };

    setFiles(prev => [newFile, ...prev]);
    addLog('success', `Allocated '${name}' (${size} blk) via ${strategy}. Assigned blocks: ${allocationIds.slice(0, 3).join(',')}${allocationIds.length > 3 ? '...' : ''} ${strategy === 'Indexed' ? `[Idx: ${indexBlockId}]` : ''}`);
  };

  const handleDeleteFile = (id) => {
    const file = files.find(f => f.id === id);
    if (!file) return;

    setBlocks(prev => {
      const newBlocks = [...prev];
      file.blocksAllocated.forEach(blockId => {
        newBlocks[blockId] = {
          id: blockId,
          isFree: true,
          fileId: null,
          type: 'data',
          next: null,
          color: null
        };
      });
      return newBlocks;
    });

    setFiles(prev => prev.filter(f => f.id !== id));
    addLog('System', `Deleted file '${file.name}'. Freed ${file.blocksAllocated.length} blocks.`);
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* Shader Background Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 1, overflow: 'hidden' }}>
        <InteractiveWaveShader />
      </div>

      <header className="app-header" style={{ position: 'relative', zIndex: 10 }}>
        <div>
          <h1 className="title-gradient">Memory Allocator OS Visualizer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Real-time Contiguous, Linked, and Indexed File System Simulator</p>
        </div>
        <StatusBar blocks={blocks} files={files} />
      </header>
      
      <aside className="sidebar" style={{ position: 'relative', zIndex: 10 }}>
        <ControlPanel onAddFile={handleAddFile} />
        <FileList files={files} onDeleteFile={handleDeleteFile} />
      </aside>

      <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <DiskVisualizer blocks={blocks} />
        <OperationLog logs={logs} />
      </main>
    </div>
  );
}

export default App;
