import { useState, useCallback } from 'react';

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

  const addElement = useCallback((element: CanvasElement) => {
    setElements(prevElements => [...prevElements, element]);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setElements(prevElements =>
      prevElements.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements(prevElements => prevElements.filter(el => el.id !== id));
  }, []);

  const clearBoard = useCallback(() => {
    setElements([]);
  }, []);

  const bringToFront = useCallback((id: string) => {
    setElements(prevElements => {
      const element = prevElements.find(el => el.id === id);
      if (!element) return prevElements;
      const otherElements = prevElements.filter(el => el.id !== id);
      return [...otherElements, { ...element, zIndex: Math.max(...otherElements.map(el => el.zIndex)) + 1 }];
    });
  }, []);

  const sendToBack = useCallback((id: string) => {
    setElements(prevElements => {
      const element = prevElements.find(el => el.id === id);
      if (!element) return prevElements;
      const otherElements = prevElements.filter(el => el.id !== id);
      return [{ ...element, zIndex: Math.min(...otherElements.map(el => el.zIndex)) - 1 }, ...otherElements];
    });
  }, []);

  return {
    elements,
    addElement,
    updateElement,
    removeElement,
    clearBoard,
    bringToFront,
    sendToBack,
  };
};