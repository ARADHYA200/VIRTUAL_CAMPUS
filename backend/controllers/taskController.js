const Task = require("../models/Task");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  return sendSuccess(res, {
    message: "Tasks fetched",
    data: { tasks },
  });
});

const getTasksByRoom = asyncHandler(async (req, res) => {
  const { room } = req.params;
  const tasks = await Task.find({ room });

  return sendSuccess(res, {
    message: "Room tasks fetched",
    data: { tasks },
  });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, room, question, options, correctAnswer, points, xpReward } = req.body;

  if (!room || !question || !options || !correctAnswer) {
    return sendError(res, {
      statusCode: 400,
      message: "Room, question, options, and correctAnswer are required",
    });
  }

  const task = await Task.create({
    title,
    room,
    question,
    options,
    correctAnswer,
    points,
    xpReward,
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Task created",
    data: { task },
  });
});

module.exports = {
  getTasks,
  getTasksByRoom,
  createTask,
};
