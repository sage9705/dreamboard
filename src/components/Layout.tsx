import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'DreamBoard' }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Create stunning mood boards with DreamBoard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow">
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