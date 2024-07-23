import React, { useState, useRef, useEffect } from 'react';
import CanvasElement from './CanvasElement';
import { useMoodBoard } from '@/hooks/useMoodboard';

interface Image {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  alt_description: string;
  width: number;
  height: number;
}

interface MoodBoardCanvasProps {
  images: Image[];
}

const MoodBoardCanvas: React.FC<MoodBoardCanvasProps> = ({ images }) => {
  const { elements, addElement, updateElement } = useMoodBoard();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [draggedElement, setDraggedElement] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setCanvasSize({ width, height });
    }
  }, []);

  const findAvailableSpace = (width: number, height: number) => {
    const padding = 10;
    let x = padding;
    let y = padding;
    let maxHeight = 0;

    while (y + height <= canvasSize.height - padding) {
      let fits = true;
      for (const element of elements) {
        if (
          x < element.x + element.width &&
          x + width > element.x &&
          y < element.y + element.height &&
          y + height > element.y
        ) {
          fits = false;
          break;
        }
      }
      if (fits) {
        return { x, y };
      }
      x += width + padding;
      if (x + width > canvasSize.width - padding) {
        x = padding;
        y += maxHeight + padding;
        maxHeight = 0;
      } else {
        maxHeight = Math.max(maxHeight, height);
      }
    }
    return null; // No space found
  };

  const addImageToCanvas = (image: Image) => {
    const aspectRatio = image.width / image.height;
    const maxWidth = canvasSize.width / 4;
    const maxHeight = canvasSize.height / 3;
    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    const position = findAvailableSpace(width, height);
    if (position) {
      addElement({
        id: `image-${Date.now()}`,
        type: 'image',
        content: image.urls.regular,
        x: position.x,
        y: position.y,
        width,
        height,
        rotation: 0,
        zIndex: elements.length,
      });
    } else {
      console.log('No space available on canvas');
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedElement(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggedElement && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      updateElement(draggedElement, { x, y });
    }
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.thumb}
            alt={image.alt_description}
            className="w-full h-32 object-cover cursor-pointer rounded-lg shadow-md"
            onClick={() => addImageToCanvas(image)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/json', JSON.stringify(image));
            }}
          />
        ))}
      </div>
      <div
        ref={canvasRef}
        className="w-full aspect-video bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden relative"
        style={{ minHeight: '60vh' }}
        onDragOver={handleDragOver}
        onDrop={(e) => {
          e.preventDefault();
          const data = e.dataTransfer.getData('application/json');
          if (data) {
            const image = JSON.parse(data);
            addImageToCanvas(image);
          }
        }}
      >
        {elements.map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            onDragStart={(e) => handleDragStart(e, element.id)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodBoardCanvas;