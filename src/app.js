const express = require("express");
const { connectDb } = require("../config/databaseConfig");
require("dotenv").config();

const app = express();


connectDb()
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`The app is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error(" Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit if DB connection fails
  });
