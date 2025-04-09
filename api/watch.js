import { fetchHTML } from '../utils/fetchHTML.js';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url param' });

  try {
    const $ = await fetchHTML(url);
    const iframes = [];

    $('.videoembed iframe').each((_, el) => {
      const src = $(el).attr('src');
      if (src) iframes.push(src);
    });

    res.status(200).json({ sources: iframes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load video stream' });
  }
}
