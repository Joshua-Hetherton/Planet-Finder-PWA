const {Router} = require("express");
const path = require("path");
const debug = require("debug")("app:home");
const chalk = require("chalk");


const router=Router()


router.get("/:name", (req,res)=>{
    const planet_name=req.params.name.toLowerCase();
    debug(chalk.blue("Planet Name:", planet_name));
    res.sendFile(path.join(__dirname, "../views/index.html"));

    valid_planets=["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
    if (!valid_planets.includes(planet_name)) {
        debug(chalk.red(`Invalid Planet Name!: ${planet_name}`));
        res.sendFile(path.join(__dirname, "../views/index.html"));
    }
})

module.exports=router;