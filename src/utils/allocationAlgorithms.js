/**
 * Finds contiguous free blocks.
 * @param {Array} blocks 
 * @param {Number} size 
 * @returns {Array|null} Array of block IDs, or null if not enough contiguous space
 */
export const allocateContiguous = (blocks, size) => {
  let consecutiveCount = 0;
  let startIndex = -1;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].isFree) {
      if (consecutiveCount === 0) startIndex = i;
      consecutiveCount++;

      if (consecutiveCount === size) {
        return Array.from({ length: size }, (_, k) => blocks[startIndex + k].id);
      }
    } else {
      consecutiveCount = 0;
      startIndex = -1;
    }
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
