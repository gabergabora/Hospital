const mongoose = require("mongoose")

const drugsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },

    price:{
        type: Number,
        required: true,
    },

    expire_Date:{
        type: Date,
        required: true,
    },

    qty:{
        type: Number,
        required: true,
    },

    category:{
        type: String,
        required: true,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const Drugs = mongoose.model("Drugs", drugsSchema, "Drugs")
module.exports = Drugs