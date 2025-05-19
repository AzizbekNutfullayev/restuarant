const pool = require("../../config/db");

    exports.addToyxona = async (req, res) => {
    try {
        const { name, rayon, address, seat_count, seat_price, phone, owner_id } = req.body;

        if (!name || !rayon || !address || !seat_count || !seat_price || !phone || !owner_id) {
        return res.status(400).json({ message: "Barcha maydonlar toldirilishi kerak" });
        }

        const result = await pool.query(
        `INSERT INTO toyxonalar (name, rayon, address, seat_count, seat_price, phone, status, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6, 'tasdiqlanmagan', $7)
        RETURNING *`,
        [name, rayon, address, seat_count, seat_price, phone, owner_id]
        );

        res.status(201).json({ message: "Toyxona qoshildi", data: result.rows[0] });
    } catch (err) {
        console.error("Toyxona qoshishda xatolik:", err.message);
        res.status(500).json({ message: "Server xatoligi" });
    }
    };
