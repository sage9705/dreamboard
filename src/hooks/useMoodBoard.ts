import { useState } from 'react';

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

export const useMoodBoard = () => {
  const [elements, setElements] = useState<CanvasElement[]>([]);

  const addElement = (element: CanvasElement) => {
    setElements([...elements, element]);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const clearBoard = () => {
    setElements([]);
  };

  return {
    elements,
    addElement,
    updateElement,
    removeElement,
    clearBoard,
  };
};