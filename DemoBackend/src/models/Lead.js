const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["New", "Contacted", "Qualified"], default: "New" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);