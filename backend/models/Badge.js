const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: String,
  icon: String,
  condition: String, // e.g. "complete 5 tasks"
});

module.exports = mongoose.model("Badge", badgeSchema);