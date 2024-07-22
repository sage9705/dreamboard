import { useState } from 'react';
import Layout from '../components/Layout';
import MoodBoardCanvas from '../components/MoodBoardCanvas';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Create() {
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Create Your Mood Board</h1>
        <div className="flex mb-8">
          <Input
            type="text"
            placeholder="Enter keywords or emotions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow mr-4"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <MoodBoardCanvas images={images} />
      </div>
    </Layout>
  );
}