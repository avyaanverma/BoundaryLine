export default {
  PORT: 3000,
  MONGO_URI: "mongodb://127.0.0.1:27017/boundaryline",
  NODE_ENV: "development",
  MORGAN_LOGGER: "dev",
  LOGGER_LEVEL: "info",
  RATELIMIT_WINDOWMS: 15 * 60 * 1000,
  RATELIMIT_MAX: 100,
  CORS_ORIGIN: "http://localhost:5173",
  DATA_LIMIT: "3mb",
};

// i have changed the app_config object into function because i was facing the clash while importing app constant in env.js
export const app_config = (nodeEnv = process.env.NODE_ENV || "development") => {
  return {
    jwt: {
      accessToken: { expiresIn: "1h" },
      refreshToken: { expiresIn: "30d" },
    }, // expiry time
    cookie: {
      accessToken: {
        httpOnly: true,
        secure: nodeEnv === "production",
        sameSite: "lax",
        maxAge: nodeEnv === "production" ? 60 * 60 * 1000 : 15 * 60 * 1000,
      },

      refreshToken: {
        httpOnly: true,
        secure: nodeEnv === "production",
        sameSite: "lax",
        maxAge:
          nodeEnv === "production"
            ? 30 * 24 * 60 * 60 * 1000
            : 15 * 60 * 1000,
      },
    },
  };
};
