const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing episode URL' });

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const iframe = $('iframe').first().attr('src');
    if (iframe) {
      res.status(200).json({ videoUrl: iframe });
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch streaming link.' });
  }
};
