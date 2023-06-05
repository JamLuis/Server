const Redis = require("ioredis");

function redisClient({ port, host }) {
  try {
    const client = new Redis({
      port: port || 6379, // Redis port
      host: host || "127.0.0.1", // Redis host
      // username: "default", // needs Redis >= 6
      // password: "my-top-secret",
      db: 0, // Defaults to 0
    });
    return client;
  } catch (error) {
    console.log("redis-error:", error);
  }
}

module.exports = redisClient;
