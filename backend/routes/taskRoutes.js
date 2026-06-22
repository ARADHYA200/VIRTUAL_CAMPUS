const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const {
  getTasks,
  getTasksByRoom,
  createTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.get("/:room", getTasksByRoom);
router.post("/", protect, authorize("admin", "faculty"), createTask);

module.exports = router;
