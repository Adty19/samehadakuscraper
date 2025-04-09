import { fetchHTML } from '../utils/fetchHTML.js';

export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'No query provided' });

  try {
    const $ = await fetchHTML(`https://samehadaku.email/?s=${query}`);
    const results = [];

    $('.listupd .bs').each((_, el) => {
      results.push({
        title: $(el).find('.tt').text(),
        link: $(el).find('a').attr('href'),
        thumbnail: $(el).find('img').attr('src')
      });
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
}
