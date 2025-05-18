const pool = require("../../config/db");

exports.addToyxonaAdmin = async (req, res) => {
  try {
    const { name, rayon, address, seat_count, seat_price, phone, owner_id } = req.body;

    if (!name || !rayon || !address || !seat_count || !seat_price || !phone || !owner_id) {
      return res.status(400).json({ message: "Hamma maydonlarni to‘ldiring" });
    }

    const result = await pool.query(
      `INSERT INTO toyxonalar (name, rayon, address, seat_count, seat_price, phone, status, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, 'tasdiqlangan', $7)
       RETURNING *`,
      [name, rayon, address, seat_count, seat_price, phone, owner_id]
    );

    res.status(201).json({
      message: "Admin tomonidan to‘yxona qo‘shildi",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};
