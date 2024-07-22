import React, { useState, useRef, useEffect } from 'react';

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

interface SelectedImage extends Image {
  position: { x: number; y: number };
  scaledWidth: number;
  scaledHeight: number;
}

interface MoodBoardCanvasProps {
  images: Image[];
}

const MoodBoardCanvas: React.FC<MoodBoardCanvasProps> = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [draggedImage, setDraggedImage] = useState<SelectedImage | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const scaleImage = (image: Image, maxWidth: number, maxHeight: number) => {
    const aspectRatio = image.width / image.height;
    let scaledWidth = image.width;
    let scaledHeight = image.height;

    if (scaledWidth > maxWidth) {
      scaledWidth = maxWidth;
      scaledHeight = scaledWidth / aspectRatio;
    }

    if (scaledHeight > maxHeight) {
      scaledHeight = maxHeight;
      scaledWidth = scaledHeight * aspectRatio;
    }

    return { scaledWidth, scaledHeight };
  };

  const addImage = (image: Image) => {
    if (canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const { scaledWidth, scaledHeight } = scaleImage(image, canvasRect.width / 2, canvasRect.height / 2);
      const newPosition = findAvailablePosition(canvasRect, scaledWidth, scaledHeight);
      
      setSelectedImages((prev) => [
        ...prev,
        {
          ...image,
          position: newPosition,
          scaledWidth,
          scaledHeight,
        }
      ]);
    }
  };

  const findAvailablePosition = (canvasRect: DOMRect, width: number, height: number) => {
    const padding = 10; // Padding between images
    const maxX = canvasRect.width - width;
    const maxY = canvasRect.height - height;

    for (let y = 0; y <= maxY; y += padding) {
      for (let x = 0; x <= maxX; x += padding) {
        if (!selectedImages.some(img => 
          x < img.position.x + img.scaledWidth &&
          x + width > img.position.x &&
          y < img.position.y + img.scaledHeight &&
          y + height > img.position.y
        )) {
          return { x, y };
        }
      }
    }

    // If no space is found, return a default position
    return { x: 0, y: 0 };
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>, image: SelectedImage) => {
    setDraggedImage(image);
    e.dataTransfer.setData('text/plain', image.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedImage && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;

      setSelectedImages((prev) =>
        prev.map((img) =>
          img.id === draggedImage.id ? { ...img, position: { x, y } } : img
        )
      );

      setDraggedImage(null);
    }
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
            onClick={() => addImage(image)}
          />
        ))}
      </div>
      <div
        ref={canvasRef}
        className="w-full aspect-video rounded-lg shadow-lg overflow-hidden relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedImages.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="absolute cursor-move"
            style={{
              left: image.position.x,
              top: image.position.y,
              width: image.scaledWidth,
              height: image.scaledHeight,
            }}
          >
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-full object-cover rounded-lg shadow-md"
              draggable
              onDragStart={(e) => handleDragStart(e, image)}
            />
            <button
              className="absolute top-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 cursor-pointer"
              onClick={() => removeImage(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBoardCanvas;