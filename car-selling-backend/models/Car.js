const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  images: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Car", carSchema);
