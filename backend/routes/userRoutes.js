const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getLeaderboard,
  completeTask,
  getMe,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/leaderboard", getLeaderboard);
router.post("/complete-task", protect, completeTask);
router.get("/me", protect, getMe);

module.exports = router;
