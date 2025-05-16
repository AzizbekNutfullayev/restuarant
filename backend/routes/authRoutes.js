const express = require('express');
const router = express.Router();

const { editProfile } = require("../controllers/auth/editProfile");
const { logIn } = require("../controllers/auth/login");
const { registr } = require("../controllers/auth/register");

router.post("/login", logIn);
router.post("/register", registr);
router.post("/edit-profile/:userId", editProfile);

module.exports = router;
