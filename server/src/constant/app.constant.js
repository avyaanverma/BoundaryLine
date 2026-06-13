export default {
    PORT : 3000,
    MONGO_URI: "http://localhost:27101",
    NODE_ENV: "development",
    MORGAN_LOGGER: "dev",
    LOGGER_LEVEL: "info",
    RATELIMIT_WINDOWMS: 15 * 60 * 1000,
    RATELIMIT_MAX: 100,
    CORS_ORIGIN: "http://localhost:5173",
    DATA_LIMIT: "3mb"
}