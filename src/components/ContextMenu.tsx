import React from 'react';
import { useDrag } from 'react-dnd';

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
  onContextMenu: (e: React.MouseEvent) => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element, onContextMenu }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'canvasElement',
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onContextMenu={onContextMenu}
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