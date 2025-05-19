const express = require("express");
const router = express.Router();

// ✅ TO‘G‘RI IMPORT nomi va joyi
const { addToyxonaAdmin } = require("../controllers/admin/addtoyxonaAdmin");
const { getAllToyxonalar } = require("../controllers/admin/getAlltoyxona");
const { approveToyxona, deleteToyxona } = require("../controllers/admin/toyxonaAction");

router.post("/add-hall", addToyxonaAdmin); 


router.patch("/toyxonalar/:id/approve", approveToyxona); 
router.delete("/toyxonalar/:id", deleteToyxona); 

router.get("/toyxonalar", getAllToyxonalar);

module.exports = router;