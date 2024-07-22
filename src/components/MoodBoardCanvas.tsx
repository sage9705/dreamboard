import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Image {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  alt_description: string;
}

interface MoodBoardCanvasProps {
  images: Image[];
}

const MoodBoardCanvas: React.FC<MoodBoardCanvasProps> = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  const addImage = (image: Image) => {
    setSelectedImages((prev) => [...prev, image]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4 mb-8">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.thumb}
            alt={image.alt_description}
            className="w-full h-32 object-cover cursor-pointer"
            onClick={() => addImage(image)}
          />
        ))}
      </div>
      <div className="w-full aspect-video bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
        {selectedImages.map((image, index) => (
          <motion.img
            key={`${image.id}-${index}`}
            src={image.urls.regular}
            alt={image.alt_description}
            className="absolute w-1/3 h-1/3 object-cover cursor-move"
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodBoardCanvas;