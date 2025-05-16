const pool = require('../../config/db');
const bcryptjs = require('bcryptjs');

exports.registr = async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    if (!firstname || !lastname || !username || !password) {
      return res.status(400).json({ message: "hamma qatorlarni to'ldiring iltimos " });
    }

    const bcryptPasword = await bcryptjs.hash(password, 10);


    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, username, password, role)
       VALUES ($1, $2, $3, $4, 'user')
       RETURNING id, firstname, lastname, username, role`,
      [firstname, lastname, username, bcryptPasword]
    );
    console.log(result);
    
    const user = result.rows[0];
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Serverda xatolik" });
  }
};
