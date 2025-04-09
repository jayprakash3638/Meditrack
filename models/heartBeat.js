// models/Heartbeat.js
const mongoose = require("mongoose");

const heartbeatSchema = new mongoose.Schema({
  pulse: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Heartbeat", heartbeatSchema);