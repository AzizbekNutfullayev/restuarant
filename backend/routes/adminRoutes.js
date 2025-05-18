const express = require("express");
const router = express.Router();

// ✅ TO‘G‘RI IMPORT nomi va joyi
const { addToyxonaAdmin } = require("../controllers/admin/addToyxonaAdmin");
const { getAllToyxonalar } = require("../controllers/admin/getAllToyxona");
const { approveToyxona, deleteToyxona } = require("../controllers/admin/toyxonaAction");

// ✅ Admin yangi to‘yxona qo‘shadi
router.post("/add-hall", addToyxonaAdmin); // ✅ ishlaydi


router.patch("/toyxonalar/:id/approve", approveToyxona);  // ✅ Tasdiqlash
router.delete("/toyxonalar/:id", deleteToyxona);  // ✅ O‘chirish
// ✅ Admin to‘yxonani tasdiqlaydi
// ✅ Admin to‘yxonani o‘chiradi

// ✅ Admin barcha to‘yxonalarni ko‘radi
router.get("/toyxonalar", getAllToyxonalar);

module.exports = router;
