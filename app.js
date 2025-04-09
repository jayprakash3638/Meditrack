const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Room = require("./models/room.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/Hospital";
const Heartbeat = require("./models/heartBeat.js");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, I am Hospital root");
  });

  //Index Route
app.get("/rooms", async (req, res) => {
    const allRooms = await Room.find({});
    res.render("rooms/index.ejs", { allRooms });
  });

// app.get("/rooms", async (req, res) => {
//   const allRooms = await Room.find({});
  
//   // Fetch latest pulse
//   const latestPulse = await Heartbeat.findOne().sort({ timestamp: -1 });

//   res.render("rooms/index.ejs", { allRooms, latestPulse });
// });


//New Route
app.get("/rooms/new", (req, res) => {
    res.render("rooms/new.ejs");
  });
  
  //Show Route
  app.get("/rooms/:id", async (req, res) => {
    let { id } = req.params;
    const room = await Room.findById(id);
    const latestPulse = await Heartbeat.findOne().sort({ timestamp: -1 });
    res.render("rooms/show.ejs", { room, latestPulse });
  });
//Create Route
app.post("/rooms", async (req, res) => {
    const newroom = new Room(req.body.room);
    await newroom.save();
    res.redirect("/rooms");
  });

//Edit Route
app.get("/rooms/:id/edit", async (req, res) => {
    let { id } = req.params;
    const room = await Room.findById(id);
    res.render("rooms/edit.ejs", { room });
  });
  
  //Update Route
  app.put("/rooms/:id", async (req, res) => {
    let { id } = req.params;
    await Room.findByIdAndUpdate(id, { ...req.body.room });
    res.redirect(`/rooms/${id}`);
  });

  //Delete Route
app.delete("/rooms/:id", async (req, res) => {
    let { id } = req.params;
    let deletedroom = await Room.findByIdAndDelete(id);
    console.log(deletedroom);
    res.redirect("/rooms");
  });

  app.get("/heart", async (req, res) => {
      const pulses = await Heartbeat.findOne().sort({ timestamp: -1 });
        res.render("rooms/show.ejs", { pulses });
  });

  app.post("/heart", async (req, res) => {
    try {
      const { pulse } = req.body;
  
      const newPulse = new Heartbeat({ pulse });
      await newPulse.save();
  
      res.status(201).json({ message: "Pulse saved", pulse: newPulse });
    } catch (err) {
      res.status(500).json({ error: "Error saving pulse" });
    }
  });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });


  //patientSchema->listingSchema
  //listings->rooms
