const mongoose = require("mongoose");
const initData = require("./data.js");
const Room = require("../models/room.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/Hospital";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Room.deleteMany({});
    await Room.insertMany(initData.data);
    console.log("data was initialized");
  };
  
  initDB();