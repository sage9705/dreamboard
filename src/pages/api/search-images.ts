import { NextApiRequest, NextApiResponse } from 'next';
import unsplash from '../../utils/unsplash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const queries = (query as string).split(',');
    const results = await Promise.all(
      queries.map(async (q) => {
        const result = await unsplash.search.getPhotos({
          query: q.trim(),
          page: 1,
          perPage: 10,
          orderBy: 'relevant',
        });
        return result.response?.results || [];
      })
    );

    const flattenedResults = results.flat();
    const shuffledResults = flattenedResults.sort(() => 0.5 - Math.random());

    res.status(200).json({ results: shuffledResults.slice(0, 30) });
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    res.status(500).json({ error: 'Error fetching images from Unsplash' });
  }
}