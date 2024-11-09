import React, { useRef, useCallback, useEffect } from 'react';
import useGridCalculations from '../hooks/useGridCalculations';

const GRID_CONSTANTS = {
  MIN_ITEM_SIZE: 60,
  MAX_ITEM_SIZE: 120,
  INITIAL_ITEM_SIZE: 90,
  SIZE_STEP: 10,
} as const;

export const DynamicGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { metrics, items, updateGrid, setMetrics } = useGridCalculations(
    containerRef,
    GRID_CONSTANTS.INITIAL_ITEM_SIZE
  );

  const handleSizeChange = useCallback((increment: boolean) => {
    setMetrics(prev => {
      const newSize = increment
        ? Math.min(prev.itemSize + GRID_CONSTANTS.SIZE_STEP, GRID_CONSTANTS.MAX_ITEM_SIZE)
        : Math.max(prev.itemSize - GRID_CONSTANTS.SIZE_STEP, GRID_CONSTANTS.MIN_ITEM_SIZE);
      
      return {
        ...prev,
        itemSize: newSize,
      };
    });
  }, [setMetrics]);

  useEffect(() => {
    updateGrid();
    const resizeObserver = new ResizeObserver(() => {
      updateGrid();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateGrid);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateGrid);
    };
  }, [updateGrid]);

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => handleSizeChange(false)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Decrease Size
        </button>
        <button
          onClick={() => handleSizeChange(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Increase Size
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-auto border border-gray-200 rounded-lg"
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
        }}
      >
        <div
          className="grid gap-4 p-4"
          style={{
            width: `${metrics.columns * metrics.itemSize}px`,
            gridTemplateColumns: `repeat(${metrics.columns}, ${metrics.itemSize}px)`,
            gridAutoRows: `${metrics.itemSize}px`,
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:shadow-md flex items-center justify-center"
              style={{
                width: `${metrics.itemSize}px`,
                height: `${metrics.itemSize}px`,
              }}
            >
              {item.content || (
                <div className="w-1/2 h-1/2 bg-gray-200 rounded-md" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;
