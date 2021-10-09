const mongoose = require("mongoose")

const doctorCategodrySchema = new mongoose.Schema({
    name: {
        type: String,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const DctorCategory = mongoose.model("Doctor Category", doctorCategodrySchema, "Doctor Category")
module.exports = DctorCategory