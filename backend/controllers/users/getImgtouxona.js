const pool = require('../../config/db');  // to‘g‘ri yo‘lni moslashtiring

exports.getToyxonalarImage = async (req, res) => {
  try {
    const query = `
      SELECT t.*, ti.image, ti.filename
      FROM toyxonalar t
      LEFT JOIN LATERAL (
          SELECT image, filename
          FROM toyxona_images
          WHERE toyxona_id = t.id
          ORDER BY id ASC
          LIMIT 1
      ) ti ON true
      ORDER BY t.id;
    `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
  }
};
