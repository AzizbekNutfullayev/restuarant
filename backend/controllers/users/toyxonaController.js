const pool = require("../../config/db");

exports.getToyxonalar = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM toyxonalar WHERE status = 'tasdiqlangan'`
    );
    console.log(result);
    
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("Xatolik:", err.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};

