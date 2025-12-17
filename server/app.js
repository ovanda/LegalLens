
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const documentsRoute = require("./routes/documents");
const feedbackRoute = require("./routes/feedback");
const askRoute = require("./routes/ask");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/documents", documentsRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/ask", askRoute);

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = app;


