///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
//mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Connection Events
mongoose.connection
    .on("open", () => console.log("You are mongoose"))
    .on("close", () => console.log("You are not mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// MODEL
////////////////////////////////
const RecordSchema = new mongoose.Schema({
    name: String,
    image: String,
    band: String,
});

const Record = mongoose.model("Record", RecordSchema);

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

///////////////////////////////
// ROUTES
////////////////////////////////
// test route
app.get("/", (req, res) => {
    res.send("hello worldly human");
});
// RECORD INDEX ROUTE
app.get("/record", async (req, res) => {
    try {
        // send all records
        res.json(await Record.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// RECORD CREATE ROUTE
app.post("/record", async (req, res) => {
    try {
        // send all records
        res.json(await Record.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// RECORD DELETE ROUTE
app.delete("/record/:id", async (req, res) => {
    try {
        // send all records
        res.json(await Record.findByIdAndRemove(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// RECORD UPDATE ROUTE
app.put("/record/:id", async (req, res) => {
    try {
        // send all records
        res.json(
            await Record.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`jammin' on PORT ${PORT}`));