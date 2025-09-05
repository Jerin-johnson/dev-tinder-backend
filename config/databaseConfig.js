const mongoose = require("mongoose");
require("dotenv").config();

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Stop app if DB fails
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed (SIGINT)");
  process.exit(0);
});

module.exports = { connectDb };
