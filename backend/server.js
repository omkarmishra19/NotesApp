const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
require("dotenv").config();


const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
