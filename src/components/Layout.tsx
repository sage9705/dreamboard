import React from 'react';
import Head from 'next/head';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'DreamBoard' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Create stunning mood boards with DreamBoard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-primary dark:bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DreamBoard</h1>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-gray-600 text-primary dark:text-white">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {children}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4">
        <div className="container mx-auto text-center">
          &copy;2024 DreamBoard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;