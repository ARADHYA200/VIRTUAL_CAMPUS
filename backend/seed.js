require("dotenv").config();
const connectDB = require("./config/db");
const Task = require("./models/Task");

const tasks = [
  {
    title: "AI Basics",
    room: "library",
    question: "What is Artificial Intelligence?",
    options: [
      "A robot",
      "A programming language",
      "Machines performing tasks that typically require human intelligence",
      "A type of computer",
    ],
    correctAnswer: "Machines performing tasks that typically require human intelligence",
    points: 50,
    xpReward: 100,
  },
  {
    title: "Data Science",
    room: "lab",
    question: "What does 'ML' stand for in Machine Learning?",
    options: ["Machine Language", "Mega Learning", "Machine Learning", "Modern Logic"],
    correctAnswer: "Machine Learning",
    points: 50,
    xpReward: 100,
  },
  {
    title: "Quiz Challenge",
    room: "quiz",
    question: "Which of these is a programming paradigm?",
    options: ["Object-Oriented", "Waterfall", "Agile", "Scrum"],
    correctAnswer: "Object-Oriented",
    points: 50,
    xpReward: 100,
  },
];

async function seedTasks() {
  try {
    await connectDB();
    await Task.deleteMany();
    await Task.insertMany(tasks);
    console.log("Tasks seeded successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } finally {
    await Task.db.close();
  }
}

seedTasks();
