const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room: {
    type: Number,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  Condition: {
    type: String,
    required: true
  },
  Doctor: {
    type: String,
    
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
