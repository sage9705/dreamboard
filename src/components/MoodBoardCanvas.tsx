import React, { useState, useRef, useEffect, useCallback, MutableRefObject } from 'react';
import { useDrop } from 'react-dnd';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import { useMoodBoard } from '../hooks/useMoodBoard';
import CanvasElement from './CanvasElement';
import ContextMenu from './ContextMenu';
import Image from 'next/image';

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

interface CanvasElement {
  id: string;
  type: 'image' | 'text';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

const MoodBoardCanvas: React.FC<MoodBoardCanvasProps> = ({ images }) => {
  const { elements, addElement, updateElement, removeElement, bringToFront, sendToBack } = useMoodBoard();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; elementId: string } | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setCanvasSize({ width, height });
    }
  }, []);

  const [, drop] = useDrop({
    accept: 'canvasElement',
    drop: (item: { id: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && item.id) {
        const element = elements.find(el => el.id === item.id);
        if (element) {
          const x = Math.round(element.x + delta.x);
          const y = Math.round(element.y + delta.y);
          updateElement(item.id, { x, y });
          expandCanvas(x + element.width, y + element.height);
        }
      }
    },
  });

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (canvasRef as MutableRefObject<HTMLDivElement | null>).current = node;
      drop(node);
    },
    [drop]
  );

  const findAvailableSpace = useCallback((width: number, height: number) => {
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
    return null;
  }, [canvasSize, elements]);

  const expandCanvas = useCallback((newWidth: number, newHeight: number) => {
    setCanvasSize(prev => ({
      width: Math.max(prev.width, newWidth + 100),
      height: Math.max(prev.height, newHeight + 100)
    }));
  }, []);

  const addImageToCanvas = useCallback((image: Image) => {
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
  }, [addElement, canvasSize, elements.length, expandCanvas, findAvailableSpace]);

  const handleContextMenu = useCallback((e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, elementId });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleResize = useCallback((elementId: string, _: React.SyntheticEvent, data: ResizeCallbackData) => {
    const { size } = data;
    updateElement(elementId, { width: size.width, height: size.height });
  }, [updateElement]);

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8 w-full">
        {images.map((image) => (
          <div key={image.id} className="relative w-full pt-[100%]">
            <Image
              src={image.urls.thumb}
              alt={image.alt_description}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer rounded-lg shadow-md absolute top-0 left-0"
              onClick={() => addImageToCanvas(image)}
            />
          </div>
        ))}
      </div>
      <div
        className="w-full overflow-auto bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-lg shadow-lg mt-8"
        style={{ maxHeight: '60vh' }}
      >
        <div
          ref={combinedRef}
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            position: 'relative'
          }}
        >
          {elements.map((element) => (
            <Resizable
              key={element.id}
              width={element.width}
              height={element.height}
              onResize={(e, data) => handleResize(element.id, e, data)}
              draggableOpts={{ grid: [1, 1] }}
            >
              <div>
                <CanvasElement
                  element={element}
                  onContextMenu={(e: React.MouseEvent) => handleContextMenu(e, element.id)}
                />
              </div>
            </Resizable>
          ))}
        </div>
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onDelete={() => removeElement(contextMenu.elementId)}
          onBringToFront={() => bringToFront(contextMenu.elementId)}
          onSendToBack={() => sendToBack(contextMenu.elementId)}
        />
      )}
    </div>
  );
};

export default MoodBoardCanvas;