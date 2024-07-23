import React from 'react';

interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Color Palette</h3>
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110"
            style={{ backgroundColor: color }}
            onClick={() => navigator.clipboard.writeText(color)}
            title={`Click to copy: ${color}`}
          />
        ))}
      </div>
      {colors.length === 0 && (
        <p className="text-gray-500 italic">Colors will appear here as you add images to your mood board.</p>
      )}
    </div>
  );
};

export default ColorPalette;