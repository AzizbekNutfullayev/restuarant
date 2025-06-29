const fs = require("fs").promises;
const path = require("path");
const pool = require("../../config/db");

exports.uploadToyxonaImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Rasm topilmadi" });

    const userRole = req.user?.role;
    const ownerId = req.user?.id;
    const { toyxona_id } = req.body;

    if (!userRole || userRole !== "owner" || !ownerId || !toyxona_id) {
      return res.status(400).json({ message: "Noto‘g‘ri ma’lumotlar" });
    }

    const toyxonaResult = await pool.query(
      `SELECT * FROM toyxonalar WHERE id = $1 AND owner_id = $2`,
      [toyxona_id, ownerId]
    );

    if (toyxonaResult.rowCount === 0) {
      return res.status(403).json({ message: "Toyxona topilmadi yoki sizga tegishli emas" });
    }

    const fileBuffer = await fs.readFile(path.join(__dirname, "../../", file.path));
    const result = await pool.query(
      `INSERT INTO toyxona_images (toyxona_id, image, filename) VALUES ($1, $2, $3) RETURNING *`,
      [toyxona_id, fileBuffer, file.originalname]
    );

    res.status(201).json({ message: "Rasm saqlandi", image: result.rows[0] });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};
