import { fetchHTML } from '../utils/fetchHTML.js';

export default async function handler(req, res) {
  try {
    const $ = await fetchHTML('https://samehadaku.email/');

    const animeList = [];

    $('.listupd .bs').each((_, el) => {
      const title = $(el).find('.tt').text().trim();
      const link = $(el).find('a').attr('href');
      const thumbnail = $(el).find('img').attr('src');

      animeList.push({ title, link, thumbnail });
    });

    res.status(200).json(animeList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
