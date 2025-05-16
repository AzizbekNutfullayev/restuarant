const pool = require("../../config/db");
const bcrypt = require("bcryptjs");

exports.registr = async (req, res) => {
  try {
    const { firstname, lastname, username, password, role } = req.body;

    if (!firstname || !lastname || !username || !password || !role) {
      return res.status(400).json({ message: "Hamma maydonlarni to‘ldiring" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, username, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, firstname, lastname, username, role`,
      [firstname, lastname, username, hashedPassword, role]
    );

    res.status(201).json({ message: "Ro‘yxatdan o‘tish muvaffaqiyatli", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};
