const express = require("express");
const path = require("path");
const chalk = require("chalk");
const debug= require("debug")("app");
//Mongo DB related requirments
const mongoose=require("mongoose");
require("dotenv").config();

const app= express();

const morgan = require("morgan");
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))

const home_router=require("./routes/home_router");
const planet_router=require("./routes/planet_router");
const calendar_router=require("./routes/calendar_router");


app.use("/", home_router);
app.use("/planet", planet_router);
app.use("/calendar", calendar_router);

//MongoDB connection
const user_entries_router= require("./routes/entry_router")
app.use("/api/entries", user_entries_router);
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    debug(chalk.green("Successfully connected to MongoDB"));
    console.log(chalk.green("Successfully connected to MongoDB"));
})
.catch((error) => {
    debug(chalk.red("Error connecting to MongoDB connection", error));
    console.error(chalk.red("Error connecting to MongoDB connection", error));
});



module.exports=app;