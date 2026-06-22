const User = require("../models/User");
const Task = require("../models/Task");
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
});

exports.submitAnswer = asyncHandler(async (req, res) => {
  const { taskId, answer } = req.body;
  const userId = req.user._id;

  if (!taskId || answer === undefined) {
    return sendError(res, {
      statusCode: 400,
      message: "Task ID and answer are required",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, { statusCode: 404, message: "User not found" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return sendError(res, { statusCode: 404, message: "Task not found" });
  }

  const isCorrect = task.correctAnswer === answer;
  let reward = null;

  if (isCorrect) {
    const pointsReward = task.points || 50;
    const xpReward = task.xpReward || 100;

    user.points += pointsReward;
    user.coins += pointsReward;
    user.xp += xpReward;
    user.level = Math.floor(user.xp / 1000) + 1;

    if (!user.completedRooms.includes(task.room)) {
      user.completedRooms.push(task.room);
    }

    const totalCompleted = user.completedRooms.length;
    const newBadges = [];

    if (totalCompleted >= 1 && !user.badges.includes("First Blood")) {
      user.badges.push("First Blood");
      newBadges.push("First Blood");
    }
    if (totalCompleted >= 2 && !user.badges.includes("Brainiac")) {
      user.badges.push("Brainiac");
      newBadges.push("Brainiac");
    }
    if (totalCompleted >= 3 && !user.badges.includes("Speed Demon")) {
      user.badges.push("Speed Demon");
      newBadges.push("Speed Demon");
    }

    reward = {
      points: pointsReward,
      coins: pointsReward,
      xp: xpReward,
      newBadges,
    };
  }

  user.currentQuestionIndex += 1;
  await user.save();

  return sendSuccess(res, {
    message: isCorrect ? "Correct answer" : "Incorrect answer",
    data: {
      isCorrect,
      reward,
      user: sanitizeUser(user),
      currentQuestionIndex: user.currentQuestionIndex,
      level: user.level,
      xp: user.xp,
      points: user.points,
      coins: user.coins,
    },
  });
});
