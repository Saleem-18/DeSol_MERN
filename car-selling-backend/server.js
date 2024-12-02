const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Updated CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "https://de-sol-mern-frontend.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
