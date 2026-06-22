const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  room: String, // library, lab, quiz
  question: String,
  options: [String],
  correctAnswer: String,
  points: { type: Number, default: 50 },
  xpReward: { type: Number, default: 100 },
});

module.exports = mongoose.model("Task", taskSchema);