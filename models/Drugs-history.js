const mongoose = require("mongoose")

const drugsHistorySchema = new mongoose.Schema({
    name:{
        type: String,
    },

    doctor:{
        type: String,
    },

    username:{
        type: String,
    },

    isGiven:{
        type: Number,
        default: 0,
    },

    Date:{
        type: Date,
        default: Date.now()
    },
})

const DrugsHistory = mongoose.model("Drugs History", drugsHistorySchema,"Drugs History")
module.exports = DrugsHistory