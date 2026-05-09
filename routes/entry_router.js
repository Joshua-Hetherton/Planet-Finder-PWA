const express=require("express");
const router=express.Router();
const entry_controller=require("../controllers/entries_controller");

//CREATE
router.post("/", entry_controller.createEntry);
//READ
router.get("/", entry_controller.getEntry);
//UPDATE
router.put("/:date", entry_controller.updateEntry);
//Delete
router.delete("/:date", entry_controller.deleteEntry);

module.exports=router;