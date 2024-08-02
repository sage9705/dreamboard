import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onDelete, onBringToFront, onSendToBack }) => {
  return (
    <div
      className="absolute bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-50"
      style={{ left: x, top: y }}
    >
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => { onBringToFront(); onClose(); }}
      >
        Bring to Front
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => { onSendToBack(); onClose(); }}
      >
        Send to Back
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
        onClick={() => { onDelete(); onClose(); }}
      >
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;