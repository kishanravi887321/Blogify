import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

// Import redisClient here
import  redisClient from "./redis.js";

async function startServer() {
  try {
    // Connect Redis client before starting the server
    await redisClient.connect();

    app.listen(process.env.PORT, () => {
      console.log("server is running on the PORT:", process.env.PORT);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
