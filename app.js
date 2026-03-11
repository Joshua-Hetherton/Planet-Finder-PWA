const express = require("express");
const path = require("path");
const chalk = require("chalk");
const debug= require("debug")("app");

const app= express();

const morgan = require("morgan");
app.use(morgan("tiny"));



const home_router=require("./public/routes/home_router");
const planet_router=require("./public/routes/planet_router");
const calendar_router=require("./public/routes/calendar_router");

app.use("/", home_router);
app.use("/", planet_router);
app.use("/", calendar_router);
app.use(express.static(path.join(__dirname, "public")))


module.exports=app;