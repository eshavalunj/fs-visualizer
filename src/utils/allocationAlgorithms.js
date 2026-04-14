/**
 * Finds contiguous free blocks based on the strategy.
 * @param {Array} blocks 
 * @param {Number} size 
 * @param {String} policy - 'First Fit', 'Best Fit', or 'Worst Fit'
 * @returns {Array|null} Array of block IDs, or null if not enough contiguous space
 */
export const allocateContiguous = (blocks, size, policy = 'First Fit') => {
  const freeHoles = [];
  let currentHole = null;

  // Identify all free holes
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].isFree) {
      if (currentHole === null) {
        currentHole = { start: i, length: 1 };
      } else {
        currentHole.length++;
      }
    } else {
      if (currentHole !== null) {
        if (currentHole.length >= size) {
          freeHoles.push(currentHole);
        }
        currentHole = null;
      }
    }
  }
  if (currentHole !== null && currentHole.length >= size) {
    freeHoles.push(currentHole);
  }

  if (freeHoles.length === 0) return null;

  let selectedHole = null;

  if (policy === 'First Fit') {
    selectedHole = freeHoles[0];
  } else if (policy === 'Best Fit') {
    selectedHole = freeHoles.reduce((prev, curr) => (curr.length < prev.length ? curr : prev));
  } else if (policy === 'Worst Fit') {
    selectedHole = freeHoles.reduce((prev, curr) => (curr.length > prev.length ? curr : prev));
  }

  if (selectedHole) {
    return Array.from({ length: size }, (_, k) => blocks[selectedHole.start + k].id);
  }

  return null;
};

/**
 * Finds available free blocks for linked allocation.
 * Takes the first available free blocks scattered anywhere.
 */
export const allocateLinked = (blocks, size) => {
  const freeBlocks = blocks.filter(b => b.isFree);
  if (freeBlocks.length < size) return null;

  return freeBlocks.slice(0, size).map(b => b.id);
};

/**
 * Finds available free blocks for indexed allocation.
 * Needs size + 1 (1 for index block, then data blocks).
 */
export const allocateIndexed = (blocks, size) => {
  const freeBlocks = blocks.filter(b => b.isFree);
  if (freeBlocks.length < size + 1) return null;

  const allocated = freeBlocks.slice(0, size + 1);
  const indexBlockId = allocated[0].id;
  const dataBlockIds = allocated.slice(1).map(b => b.id);

  return { indexBlockId, dataBlockIds };
};

export const getRandomColor = () => {
    // Generate beautiful harmonious colors for the blocks
    const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
        '#22c55e', '#10b981', '#14b8a6', '#06b6d4', 
        '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', 
        '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
