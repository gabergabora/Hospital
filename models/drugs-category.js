const mongoose = require("mongoose")

const drugs_categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },

    Date:{
        type: Date,
        default: Date.now()
    },
})

const Drugs_category = mongoose.model("Drugs Category", drugs_categorySchema, "Drugs Category")
module.exports = Drugs_category