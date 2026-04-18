const express = require("express");
const path = require("path");
const chalk = require("chalk");
const debug= require("debug")("app");

const app= express();

const morgan = require("morgan");
app.use(morgan("tiny"));


app.use(express.static(path.join(__dirname, "public")))

const home_router=require("./routes/home_router");
const planet_router=require("./routes/planet_router");
const calendar_router=require("./routes/calendar_router");

app.use("/", home_router);
app.use("/planet", planet_router);
app.use("/calendar", calendar_router);


module.exports=app;