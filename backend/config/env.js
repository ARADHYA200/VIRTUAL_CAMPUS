const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (process.env.JWT_SECRET.length < 16) {
    throw new Error("JWT_SECRET must be at least 16 characters long");
  }
};

module.exports = { validateEnv };
