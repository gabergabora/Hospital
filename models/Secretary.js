const mongoose = require("mongoose")

const secretarySchema = new mongoose.Schema({
    name: {
        type: String,
    },

    born: {
        type: Date,
    },

    for_doctor: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
    },

    Date: {
        type: Date,
        default: Date.now()
    },
})

const Secretary = mongoose.model("Secretary", secretarySchema, "Secretary")
module.exports = Secretary