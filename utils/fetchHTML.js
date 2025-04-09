// utils/fetchHTML.js
import axios from 'axios';
import cheerio from 'cheerio';

export async function fetchHTML(url) {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    },
  });
  return cheerio.load(data);
}
