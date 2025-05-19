const pool = require("../../config/db");

exports.updateToyxona = async (req, res) => {
  const { id } = req.params;
  const { name, rayon, address, seat_count, seat_price, phone } = req.body;

  try {
    await pool.query(
      `UPDATE toyxonalar
       SET name = $1, rayon = $2, address = $3, seat_count = $4, seat_price = $5, phone = $6
       WHERE id = $7`,
      [name, rayon, address, seat_count, seat_price, phone, id]
    );
    res.json({ message: "Toyxona yangilandi" });
  } catch (err) {
    console.error("Tahrirlashda xatolik:", err.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};
