import { fetchHTML } from '../utils/fetchHTML.js';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url param' });

  try {
    const $ = await fetchHTML(url);
    const title = $('h1.entry-title').text();
    const thumbnail = $('.thumb img').attr('src');
    const episodes = [];

    $('.eplister ul li').each((_, el) => {
      episodes.push({
        title: $(el).find('.epl-title').text().trim(),
        link: $(el).find('a').attr('href')
      });
    });

    res.status(200).json({ title, thumbnail, episodes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch anime detail' });
  }
}
