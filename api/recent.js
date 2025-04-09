import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://samehadaku.email/');
    const $ = cheerio.load(response.data);
    const results = [];

    $('.post-show').each((i, el) => {
      const title = $(el).find('.post-title a').text().trim();
      const link = $(el).find('.post-title a').attr('href');
      const thumbnail = $(el).find('img').attr('src');

      results.push({ title, link, thumbnail });
    });

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}