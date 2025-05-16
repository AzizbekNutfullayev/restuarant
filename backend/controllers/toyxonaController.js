const pool = require("../config/db");

exports.getToyxonalar = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM toyxonalar WHERE status = 'tasdiqlanmagan'"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("DB xatoligi:", err.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};
