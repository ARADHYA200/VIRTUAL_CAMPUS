export const ROLES = {
  ADMIN: "admin",
  RECRUIT: "recruit",
  STUDENT: "student",
  FACULTY: "faculty",
  GUEST: "guest",
};

export const API_ROUTES = {
  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
  ME: "/api/users/me",
  LEADERBOARD: "/api/users/leaderboard",
  COMPLETE_TASK: "/api/users/complete-task",
  TASKS_BY_ROOM: (room) => `/api/tasks/${room}`,
  SUBMIT_ANSWER: "/api/game/submit-answer",
};
