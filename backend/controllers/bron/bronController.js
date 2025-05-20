const db = require('../../config/db');

exports.createBron = async (req, res) => {
  const { toyxona_id, name, phone, date, count_people } = req.body;

  try {
    // To'yxona o'sha sanada bandmi?
    const check = await db.query(
      'SELECT * FROM bronlar WHERE toyxona_id = $1 AND date = $2',
      [toyxona_id, date]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Bu sana band qilingan.' });
    }

    // Sana asosida status
    const today = new Date().toISOString().split('T')[0];
    const status = date < today ? 'bo\'lib o\'tgan' : 'endi bo\'ladigan';

    await db.query(
      `INSERT INTO bronlar (toyxona_id, name, phone, date, count_people, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [toyxona_id, name, phone, date, count_people, status]
    );

    res.status(201).json({ message: "✅ Bron yaratildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server xatoligi' });
  }
};


exports.getAllBronlar = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT b.id, b.name, b.phone, b.date, b.count_people, b.status,
             t.name AS toyxona_name
      FROM bronlar b
      JOIN toyxonalar t ON b.toyxona_id = t.id
      ORDER BY b.date DESC
    `);

    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Bronlarni olishda xatolik' });
  }
};


exports.getOwnerBronlar = async (req, res) => {
  const { owner_id } = req.params;

  try {
    const result = await db.query(`
      SELECT b.*, t.name AS toyxona_name
      FROM bronlar b
      JOIN toyxonalar t ON b.toyxona_id = t.id
      WHERE t.owner_id = $1
      ORDER BY b.date DESC
    `, [owner_id]);

    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Owner bronlarni olishda xatolik" });
  }
};
