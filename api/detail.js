import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    const response = await axios.get(`https://samehadaku.email/${slug}`);
    const $ = cheerio.load(response.data);

    const title = $('h1.entry-title').text().trim();
    const description = $('div.entry-content p').first().text().trim();
    const episodes = [];

    $('div.entry-content a').each((i, el) => {
      const ep = $(el).text();
      const url = $(el).attr('href');
      if (url.includes('samehadaku.email')) {
        episodes.push({ ep, url });
      }
    });

    res.status(200).json({ title, description, episodes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch detail' });
  }
}