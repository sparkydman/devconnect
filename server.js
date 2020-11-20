const express = require("express");

const connectDB = require("./config/db");

const app = express();

// Connecting Database
connectDB();

app.get("/", (req, res) => {
  res.send("app is running");
});

const PORT = process.env.POST || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
