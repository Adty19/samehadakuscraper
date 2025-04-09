const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get('https://samehadaku.email/');
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
    res.status(500).json({ error: 'Failed to fetch anime list.' });
  }
};
