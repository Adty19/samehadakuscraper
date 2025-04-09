const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get('https://samehadaku.email/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const animeList = [];

    $('.content .post-show').each((i, el) => {
      const title = $(el).find('.post-title a').text().trim();
      const url = $(el).find('.post-title a').attr('href');
      const image = $(el).find('img').attr('src');

      animeList.push({ title, url, image });
    });

    res.status(200).json({ results: animeList });
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
