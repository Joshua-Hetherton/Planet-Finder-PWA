const mongoose=require("mongoose");
const Schema= mongoose.Schema

const day_schema=new Schema ({
    // Added user_id with a temp value of 1, and can be replaced with actual users(currently out of scope for this project, as I dont need a full User system)
    user_id: {type: String, required:true, default:1},
    date: {type: Date, required: true},
    planet_observed: {type:String, required:true},
    equipment_used: {type: String, required:true},
    viewing_location: {type:String, required:true},
    user_notes: {type:String, required:true}
})

module.exports=mongoose.model("Day", day_schema);