const User = require("../models/User");
const { ROLES } = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  level: user.level,
  xp: user.xp,
  points: user.points,
  coins: user.coins,
  badges: user.badges,
  completedRooms: user.completedRooms,
  currentQuestionIndex: user.currentQuestionIndex,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return sendError(res, {
      statusCode: 400,
      message: "Name, email, and password are required",
    });
  }

  if (password.length < 6) {
    return sendError(res, {
      statusCode: 400,
      message: "Password must be at least 6 characters",
    });
  }

  if (role && !ROLES.includes(role)) {
    return sendError(res, {
      statusCode: 400,
      message: `Role must be one of: ${ROLES.join(", ")}`,
    });
  }

  const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingEmail) {
    return sendError(res, { statusCode: 400, message: "Email already registered" });
  }

  const existingName = await User.findOne({ name: name.trim() });
  if (existingName) {
    return sendError(res, { statusCode: 400, message: "Callsign already taken" });
  }

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: role || "student",
  });

  const token = generateToken(user._id);

  return sendSuccess(res, {
    statusCode: 201,
    message: "Registration successful",
    data: {
      token,
      user: sanitizeUser(user),
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!password || (!name && !email)) {
    return sendError(res, {
      statusCode: 400,
      message: "Password and either name or email are required",
    });
  }

  const query = email
    ? { email: email.toLowerCase().trim() }
    : { name: name.trim() };

  const user = await User.findOne(query).select("+password");

  if (!user) {
    return sendError(res, { statusCode: 401, message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return sendError(res, { statusCode: 401, message: "Invalid credentials" });
  }

  const token = generateToken(user._id);

  return sendSuccess(res, {
    message: "Login successful",
    data: {
      token,
      user: sanitizeUser(user),
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Profile fetched",
    data: { user: sanitizeUser(req.user) },
  });
});

const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("name level xp points coins badges role")
    .sort({ points: -1 })
    .limit(10);

  return sendSuccess(res, {
    message: "Leaderboard fetched",
    data: { leaderboard: users },
  });
});

const completeTask = asyncHandler(async (req, res) => {
  const Task = require("../models/Task");
  const { taskId } = req.body;
  const userId = req.user._id;

  if (!taskId) {
    return sendError(res, { statusCode: 400, message: "Task ID is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, { statusCode: 404, message: "User not found" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return sendError(res, { statusCode: 404, message: "Task not found" });
  }

  const pointsReward = task.points || 50;
  const xpReward = task.xpReward || 100;

  user.points += pointsReward;
  user.xp += xpReward;
  user.level = Math.floor(user.xp / 500) + 1;

  if (!user.completedRooms.includes(task.room)) {
    user.completedRooms.push(task.room);
  }

  const totalCompleted = user.completedRooms.length;
  if (totalCompleted >= 3 && !user.badges.includes("Rookie Explorer")) {
    user.badges.push("Rookie Explorer");
  }
  if (totalCompleted >= 5 && !user.badges.includes("Campus Master")) {
    user.badges.push("Campus Master");
  }

  await user.save();

  return sendSuccess(res, {
    message: "Task completed",
    data: {
      user: sanitizeUser(user),
      reward: { points: pointsReward, xp: xpReward },
    },
  });
});

module.exports = {
  register,
  login,
  getMe,
  getLeaderboard,
  completeTask,
};
