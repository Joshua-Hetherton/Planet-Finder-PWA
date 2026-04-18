const {Router} = require("express");
const path = require("path");
const debug = require("debug")("app:home");
const chalk = require("chalk");

const router=Router()


router.get("/", (req,res)=>{
    debug("Serving Up Home page");
    res.sendFile(path.join(__dirname,".." , "views", "index.html"));
})

module.exports=router;
