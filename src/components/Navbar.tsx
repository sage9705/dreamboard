// src/components/Navbar.tsx

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../hooks/useTheme';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-primary dark:bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DreamBoard
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/create" className="hover:text-gray-300">
            Create
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-600 text-primary dark:text-white"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;