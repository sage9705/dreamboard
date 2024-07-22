import { NextApiRequest, NextApiResponse } from 'next';
import unsplash from '../../utils/unsplash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, page = 1, perPage = 20 } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const result = await unsplash.search.getPhotos({
      query: query as string,
      page: Number(page),
      perPage: Number(perPage),
    });

    res.status(200).json(result.response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images from Unsplash' });
  }
}