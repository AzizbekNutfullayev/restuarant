const pool = require("../../config/db"); 

const editProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstname, lastname, username, password } = req.body;

    if (!firstname && !lastname && !username && !password) {
      return res.status(400).json({
        message:
          "Kamida bitta maydon (firstname, lastname, username, password) bo‘lishi kerak",
      });
    }

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (firstname) {
      fields.push(`firstname = $${paramIndex++}`);
      values.push(firstname);
    }
    if (lastname) {
      fields.push(`lastname = $${paramIndex++}`);
      values.push(lastname);
    }
    if (username) {
      fields.push(`username = $${paramIndex++}`);
      values.push(username);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push(`password = $${paramIndex++}`);
      values.push(hashedPassword);
    }

    values.push(userId);

    const query = `
      UPDATE users 
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex} 
      RETURNING id, firstname, lastname, username, role
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json({ message: "Profil muvaffaqiyatli yangilandi", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(409).json({ message: "Bu username allaqachon mavjud" });
    }
    res.status(500).json({ message: "Serverda xatolik" });
  }
};

module.exports = { editProfile };
