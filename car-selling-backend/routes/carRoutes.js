const express = require("express");
const { addCar } = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addCar);

module.exports = router;
