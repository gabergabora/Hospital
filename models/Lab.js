const mongoose = require("mongoose")

const labSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    username:{
        type: String,
    },

    doctor:{
        type: String,
    },

    done:{
        type: Number,
        default: 0,
    },

    result:{
        type: String,
        default: "NO RESULT YET",
    },

    Date:{
        type: Date,
        default: Date.now(),
    }
})

const Lab = mongoose.model("Lab Test", labSchema, "Lab Test")
module.exports = Lab