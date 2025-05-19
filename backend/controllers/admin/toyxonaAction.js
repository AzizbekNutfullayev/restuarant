const pool = require("../../config/db");

exports.approveToyxona = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE toyxonalar SET status = 'tasdiqlangan' WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Toyxona topilmadi" });
    }

    res.status(200).json({ message: "Tasdiqlandi", hall: result.rows[0] });
  } catch (err) {
    console.error("Tasdiqlashda xatolik:", err.message);
    res.status(500).json({ message: "Tasdiqlashda server xatoligi" });
  }
};

exports.deleteToyxona = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM toyxonalar WHERE id = $1", [id]);

    res.status(200).json({ message: "Ochirildi" });
  } catch (err) {
    console.error("Ochirishda xatolik:", err.message);
    res.status(500).json({ message: "Ochirishda server xatoligi" });
  }
};
