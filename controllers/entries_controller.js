const Day=require("../models/entry");

exports.getEntry= async(req, res) => {
    Day.find().then((entries) => {
        res.status(200).json(entries);
    })
    .catch((error) => {
        res.status(500).json({error: "Error fetching the entries"});
    });
}

exports.createEntry= async(req, res) => {
    const entry= new Day({
        user_id: req.body.user_id,
        date: req.body.date,
        planet_observed: req.body.planet_observed,
        equipment_used: req.body.equipment_used,
        viewing_location: req.body.viewing_location,
        user_notes: req.body.user_notes
    })
    entry.save()
    .then((savedEntry) => {
        res.status(201).json(savedEntry);
    })
    .catch((error) => {
        res.status(500).json({error: "Error creating the entry"});
    });
}

exports.updateEntry= async(req, res) => {
    const date=req.params.date;

    Day.findOne({date:date}).then((entry) => {
        if(!entry) {
            return res.status(404).json({error: "Entry not found"});
        }
        entry.user_id= req.body.user_id,
        entry.date= req.body.date,
        entry.planet_observed= req.body.planet_observed,
        entry.equipment_used= req.body.equipment_used,
        entry.viewing_location= req.body.viewing_location,
        entry.user_notes= req.body.user_notes
        entry.save().then((savedEntry) => {
        res.status(201).json(savedEntry);
    })
    .catch((error) => {
        res.status(500).json({error: "Error creating the entry"});
    });
    });
    
}

exports.deleteEntry= async(req, res) => {
    const date=req.params.date;

    Day.deleteOne({date:date}).then((result) => {
        if(!(result.deletedCount ===0)) {
            res.status(200).json({message: "Entry Deleted"});
        }
        else {
            res.status(404).json({error: "Entry not found"});
        }
    })
    .catch((error) => {
        res.status(500).json({error: "Error deleting the entry"});
    });
}