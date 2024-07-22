import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredIndex(Math.floor(Math.random() * 6))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>DreamBoard - Ignite Your Creativity</title>
        <meta name="description" content="Create stunning mood boards that inspire and captivate with DreamBoard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-gray-100 overflow-hidden">
        {colors.map((color, index) => (
          <motion.div
            key={color}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundColor: color,
              zIndex: index,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: hoveredIndex === index ? 1 : 0,
              rotate: hoveredIndex === index ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-6xl sm:text-8xl font-extrabold text-gray-900 mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Dream<span className="text-primary">Board</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-12 text-center max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your ideas into stunning visual stories. Craft mood boards that inspire, captivate, and bring your vision to life.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Create', 'Inspire', 'Design', 'Visualize', 'Innovate', 'Dream'].map((word, index) => (
              <motion.div
                key={word}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className="absolute inset-0 bg-white rounded-lg transform transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: hoveredIndex === index ? colors[index] : 'white',
                  }}
                ></div>
                <span className="relative z-10 block px-4 py-2 text-lg font-semibold transition-colors duration-200"
                  style={{
                    color: hoveredIndex === index ? 'white' : colors[index],
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/create" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light transition duration-150 ease-in-out transform hover:scale-105">
              Start Creating
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}