const { nanoid } = require('nanoid');
const db = require('../db/dbConfig');

async function shortenUrl(req, res) {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const shortCode = nanoid(6);

    // Save to DB using await
    await db.execute(
      'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
      [originalUrl, shortCode]
    );

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    res.json({ originalUrl, shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function redirectUrl(req, res) {
  try {
    const { code } = req.params;

    const [rows] = await db.execute(
      'SELECT original_url FROM urls WHERE short_code = ?',
      [code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(rows[0].original_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { shortenUrl, redirectUrl };


