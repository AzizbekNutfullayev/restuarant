const pool = require("../../config/db");

exports.uploadToyxonaImages = async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0)
        return res.status(400).json({ message: "Rasm yuklanmadi" });
      if (files.length > 4)
        return res.status(400).json({ message: "Maksimum 4 ta rasm" });
  
      const userRole = req.user?.role;
      if (!userRole)
        return res.status(401).json({ message: "Autentifikatsiya talab qilinadi" });
  
      const ownerId = req.user?.id;
      if (!ownerId)
        return res.status(400).json({ message: "Owner ID si talab qilinadi" });
  
      const { toyxona_id } = req.body;
      if (!toyxona_id)
        return res.status(400).json({ message: "Toyxona ID si talab qilinadi" });
  
      const toyxonaQuery = `SELECT * FROM toyxonalar WHERE id = $1 AND owner_id = $2`;
      const toyxonaResult = await pool.query(toyxonaQuery, [toyxona_id, ownerId]);
      if (toyxonaResult.rowCount === 0) {
        return res.status(403).json({ message: "Bu toyxona sizga tegishli emas yoki topilmadi" });
      }
  
      const insertImagesQuery = `
        INSERT INTO "to'yxona_images" ("to'yxona_id", image, filename)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
  
      const insertedImages = [];
      for (const file of files) {
        const values = [toyxona_id, file.buffer, file.originalname];
        const result = await pool.query(insertImagesQuery, values);
        insertedImages.push(result.rows[0]);
      }
  
      res.status(201).json({
        message: "Rasmlar muvaffaqiyatli yuklandi",
        images: insertedImages,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Ichki server xatosi" });
    }
  };
  