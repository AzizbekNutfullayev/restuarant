const pool = require("../../config/db");

exports.getImgs = async (req, res) => {
  try {
    const ownerId = req.params.id;

    const query = `
      SELECT DISTINCT ON (t.id)
             t.id, t.name, t.rayon, t.address, t.seat_count, t.seat_price, t.phone, t.status,
             encode(i.image, 'base64') AS image,
             i.filename
      FROM toyxonalar t
      LEFT JOIN toyxona_images i ON t.id = i.toyxona_id
      WHERE t.owner_id = $1
      ORDER BY t.id, i.id ASC;
    `;

    const result = await pool.query(query, [ownerId]);

    const halls = result.rows.map(row => {
      if (row.image) {
        row.image = `data:image/jpeg;base64,${row.image}`; 
      }
      return row;
    });

    return res.status(200).json(halls);
  } catch (error) {
    console.error("Get toyxonalar error:", error);
    return res.status(500).json({ message: "Server xatoligi", error: error.message });
  }
};