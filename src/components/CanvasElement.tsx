import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import Image from 'next/image';

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
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'canvasElement',
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
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
        transition: 'all 0.2s ease',
      }}
      onContextMenu={onContextMenu}
    >
      {element.type === 'image' && (
        <div className="relative w-full h-full">
          <Image
            src={element.content}
            alt="Mood board element"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CanvasElement;