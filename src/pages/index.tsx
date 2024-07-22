import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { useTheme } from '../hooks/useTheme'

const words = ['Create', 'Inspire', 'Design', 'Visualize', 'Innovate', 'Dream'];

export default function Home() {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title="DreamBoard - Ignite Your Creativity">
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-900 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 text-gray-800 dark:text-white">
            Dream<span className="text-green-500">Board</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-6 text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0">
            Transform your ideas into stunning visual stories.
          </p>
          <div className="text-3xl sm:text-4xl font-bold mb-8 h-12 text-green-600 dark:text-green-400">
            {words.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="absolute"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <Link href="/create" passHref>
            <Button variant="primary" className="text-lg px-8 py-3 bg-green-500 hover:bg-green-600 text-white">
              Start Creating
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-opacity-50 bg-green-100 dark:bg-opacity-20 dark:bg-green-800"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Create Your Vision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Craft beautiful mood boards that bring your ideas to life.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}