const pool = require("../config/db");

exports.getToyxonalar = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM toyxonalar WHERE status = 'tasdiqlangan'"
    );
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("Xatolik:", err.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};


exports.addToyxona = async (req, res) => {
  try {
    const { name, rayon, address, seat_count, seat_price, phone, owner_id } = req.body;

    if (!name || !rayon || !address || !seat_count || !seat_price || !phone || !owner_id) {
      return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak" });
    }

    const result = await pool.query(
      `INSERT INTO toyxonalar (name, rayon, address, seat_count, seat_price, phone, status, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, 'tasdiqlanmagan', $7)
       RETURNING *`,
      [name, rayon, address, seat_count, seat_price, phone, owner_id]
    );

    res.status(201).json({ message: "To‘yxona qo‘shildi", data: result.rows[0] });
  } catch (err) {
    console.error("To‘yxona qo‘shishda xatolik:", err.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};

