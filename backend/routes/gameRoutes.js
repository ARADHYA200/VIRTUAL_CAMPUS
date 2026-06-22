const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const { submitAnswer } = require("../controllers/gameController");

router.post("/submit-answer", protect, submitAnswer);

module.exports = router;
