const db = require('../../config/db');

exports.createBron = async (req, res) => {
  const { toyxona_id, name, phone, date, count_people } = req.body;

  try {
    const check = await db.query(
      'SELECT * FROM bronlar WHERE toyxona_id = $1 AND date = $2',
      [toyxona_id, date]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Bu sana band qilingan.' });
    }

    const status = new Date(date) < new Date() ? 'bo\'lib o\'tgan' : 'endi bo\'ladigan';

    await db.query(
      `INSERT INTO bronlar (toyxona_id, name, phone, date, count_people, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [toyxona_id, name, phone, date, parseInt(count_people), status]
    );

    res.status(201).json({ message: "Bron yaratildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xatoligi' });
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

exports.getBronByHallId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(`
      SELECT id, name, phone, date, count_people
      FROM bronlar
      WHERE toyxona_id = $1
      ORDER BY date ASC
    `, [id]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik band sanalarni olishda" });
  }
};

exports.deleteBron = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM bronlar WHERE id = $1", [id]);
    res.status(200).json({ message: "Bron ochirildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bronni ochirishda xatolik" });
  }
};

