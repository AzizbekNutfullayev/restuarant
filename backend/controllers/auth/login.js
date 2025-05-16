const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.logIn = async (req, res) => {
  try {
    const { username } = req.body;

    const result = await pool.query(
      `SELECT id, firstname, lastname, username, role FROM users WHERE username = $1 LIMIT 1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Username topilmadi ' });
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Login muvaffaqiyatli', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};
