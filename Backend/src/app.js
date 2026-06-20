const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.route");


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
module.exports = app;
