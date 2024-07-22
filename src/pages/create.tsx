import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import MoodBoardCanvas from '../components/MoodBoardCanvas';
import { useTheme } from '../hooks/useTheme';

export default function Create() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search-images?query=${searchQuery}`);
      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error('Error searching images:', error);
    }
  };

  return (
    <Layout title="Create Mood Board - DreamBoard">
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-900 px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800 dark:text-white">Create Your Mood Board</h1>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter keywords or emotions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 text-lg rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-green-300 dark:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
          <MoodBoardCanvas images={images} />
        </motion.div>
      </div>
    </Layout>
  );
}