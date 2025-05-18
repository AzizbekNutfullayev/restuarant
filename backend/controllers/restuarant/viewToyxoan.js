const pool = require("../../config/db");

exports.viewToyxona = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const result = await pool.query(
      `SELECT * FROM toyxonalar WHERE owner_id = $1`,
      [ownerId]
    );
    console.log(result);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatoligi" });
  }
};
