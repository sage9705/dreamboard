import React, { useState, useRef, useEffect } from 'react';
import { useMoodBoard } from '../hooks/useMoodBoard';
import CanvasElement from './CanvasElement';

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
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
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

    while (y + height <= canvasSize.height - padding) {
      let fits = true;
      for (const element of elements) {
        if (
          x < element.x + element.width + padding &&
          x + width + padding > element.x &&
          y < element.y + element.height + padding &&
          y + height + padding > element.y
        ) {
          fits = false;
          break;
        }
      }
      if (fits) {
        return { x, y };
      }
      x += padding;
      if (x + width > canvasSize.width - padding) {
        x = padding;
        y += padding;
      }
    }
    return null; // No space found
  };

  const expandCanvas = (newWidth: number, newHeight: number) => {
    setCanvasSize(prev => ({
      width: Math.max(prev.width, newWidth + 100),
      height: Math.max(prev.height, newHeight + 100)
    }));
  };

  const addImageToCanvas = (image: Image) => {
    const aspectRatio = image.width / image.height;
    const maxWidth = 200;
    const maxHeight = 200;
    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    let position = findAvailableSpace(width, height);
    if (!position) {
      expandCanvas(canvasSize.width, canvasSize.height);
      position = findAvailableSpace(width, height);
    }

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
      const x = e.clientX - canvasRect.left + canvasRef.current.scrollLeft;
      const y = e.clientY - canvasRect.top + canvasRef.current.scrollTop;
      updateElement(draggedElement, { x, y });
      
      const element = elements.find(el => el.id === draggedElement);
      if (element) {
        expandCanvas(x + element.width, y + element.height);
      }
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
          />
        ))}
      </div>
      <div
        className="w-full overflow-auto bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-lg shadow-lg"
        style={{ maxHeight: '70vh' }}
      >
        <div
          ref={canvasRef}
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            position: 'relative'
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            if (id && canvasRef.current) {
              const canvasRect = canvasRef.current.getBoundingClientRect();
              const x = e.clientX - canvasRect.left + canvasRef.current.scrollLeft;
              const y = e.clientY - canvasRect.top + canvasRef.current.scrollTop;
              updateElement(id, { x, y });
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
    </div>
  );
};

export default MoodBoardCanvas;