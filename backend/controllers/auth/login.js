const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Username topilmadi" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Parol noto‘g‘ri" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    console.log(token);
    
    res.status(200).json({ message: "Login muvaffaqiyatli", token });
  } catch (error) {
    console.error("Xatolik:", error.message);
    res.status(500).json({ message: "Server xatoligi" });
  }
};
