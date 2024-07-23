import React from 'react';

interface CanvasElementProps {
  element: {
    id: string;
    type: 'image' | 'text';
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    zIndex: number;
  };
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element, onDragStart, onDrag, onDragEnd }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
        transition: 'transform 0.1s ease-out',
      }}
      className="cursor-move"
    >
      {element.type === 'image' && (
        <img
          src={element.content}
          alt="Mood board element"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default CanvasElement;