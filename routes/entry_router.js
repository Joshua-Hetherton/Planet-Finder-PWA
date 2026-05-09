const express=require("express");
const router=express.router();
const entry_controller=require("../controllers/entries_controller");

router.get("/entry/:date", entry_controller);
router.post("/entry", entry_controller)