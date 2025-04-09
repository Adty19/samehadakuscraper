import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    const response = await axios.get(`https://samehadaku.email/${slug}`);
    const $ = cheerio.load(response.data);

    const videoEmbed = $('iframe').attr('src') || null;

    res.status(200).json({ videoUrl: videoEmbed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
}