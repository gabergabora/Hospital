const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

   username:{
        type: String,
        unique: true,
        required: true,
    },

    born: {
        type: Date,
        required: true,
    },

    blood_type: {
        type: String,
    },

    image:{
        type: String,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("Users", userSchema, "Users")
module.exports = User