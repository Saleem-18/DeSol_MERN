const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, carController.addCar);

module.exports = router;
