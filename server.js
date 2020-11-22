const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors("*"));

app.use(express.json({ extended: false }));

// Connecting Database
connectDB();

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

const PORT = process.env.POST || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
