import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import MoodBoardCanvas from '../components/MoodBoardCanvas';
import { useTheme } from '../hooks/useTheme';

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

export default function Create() {
  const { theme } = useTheme();
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [images, setImages] = useState<Image[]>([]);

  const addSearchQuery = () => {
    if (currentQuery && searchQueries.length < 5) {
      setSearchQueries([...searchQueries, currentQuery]);
      setCurrentQuery('');
    }
  };

  const removeSearchQuery = (index: number) => {
    setSearchQueries(searchQueries.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (searchQueries.length === 0) return;

    try {
      const queryString = searchQueries.join(',');
      const response = await fetch(`/api/search-images?query=${queryString}`);
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
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQueries.map((query, index) => (
                <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                  <span>{query}</span>
                  <button onClick={() => removeSearchQuery(index)} className="ml-2 text-green-600 hover:text-green-800">
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="relative flex">
              <input
                type="text"
                placeholder="Enter keywords or emotions (max 5)"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                className="w-full px-5 py-3 text-lg rounded-l-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-green-300 dark:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                onKeyPress={(e) => e.key === 'Enter' && addSearchQuery()}
              />
              <button
                onClick={addSearchQuery}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Add
              </button>
            </div>
            <button
              onClick={handleSearch}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Search Images
            </button>
          </div>
          <MoodBoardCanvas images={images} />
        </motion.div>
      </div>
    </Layout>
  );
}