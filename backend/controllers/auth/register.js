const pool = require("../../config/db");
const bcrypt = require("bcryptjs");

exports.registr = async (req, res) => {
  try {
    const { firstname, lastname, username, password, role } = req.body;

    if (!firstname || !lastname || !username || !password || !role) {
      return res.status(400).json({ message: "Hamma maydon to‘ldirilsin" });
    }

    const existing = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Username band" });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, username, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, firstname, lastname, username, role`,
      [firstname, lastname, username, hash, role]
    );

    res.status(201).json({ message: `${role} yaratildi`, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Server xatoligi" });
  }
};
