

const pool = require("../../config/db");


exports.getAllToyxonalar = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT toyxonalar.*, users.firstname AS owner_firstname, users.lastname AS owner_lastname
      FROM toyxonalar 
      LEFT JOIN users  ON toyxonalar.owner_id = users.id
      ORDER BY toyxonalar.id DESC
    `);

    res.status(200).json({
      message: "hamma toyxonalar ",
      data: result.rows
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};


exports.getToyxonalar = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM toyxonalar WHERE status = 'tasdiqlangan' ORDER BY id DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Bazadan xatolik" });
  }
};
