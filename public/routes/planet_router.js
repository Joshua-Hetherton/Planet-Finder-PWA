const {Router} = require("express");
const path = require("path");
const debug = require("debug")("app:planet_router");
const chalk = require("chalk");


const router=Router()


router.get("/:name", (req,res)=>{
    const planet_name=req.params.name.toLowerCase();
    debug(chalk.blue("Planet Name:", planet_name));

    const valid_planets=["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];


    if (!valid_planets.includes(planet_name)) {
        debug(chalk.red(`Invalid Planet Name!: ${planet_name}`));
        return res.status(404).send("Planet not Found!");
    }

    debug(chalk.green(`Valid Planet Name Found: ${planet_name}`));
    const filepath=path.join(__dirname,".." ,".." , "views", "planet-info.html");
    
    console.log(chalk.green(`Looking for file at: ${filepath}`));
    res.sendFile(filepath);
})

module.exports=router;