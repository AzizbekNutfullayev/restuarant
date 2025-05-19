const express = require("express");
const router = express.Router();

const { addToyxonaAdmin } = require("../controllers/admin/addToyxonaAdmin");
const { getAllToyxonalar } = require("../controllers/admin/getAllToyxona");
const { approveToyxona, deleteToyxona } = require("../controllers/admin/toyxonaAction");

router.post("/add-hall", addToyxonaAdmin); 


router.patch("/toyxonalar/:id/approve", approveToyxona); 
router.delete("/toyxonalar/:id", deleteToyxona); 

router.get("/toyxonalar", getAllToyxonalar);

module.exports = router;
