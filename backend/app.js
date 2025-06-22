const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const adminRoute = require("./route/adminRoutes");
const userRoute = require("./route/userRoute");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

// MongoDB Connection
mongoose.connect(process.env.DBCON, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
