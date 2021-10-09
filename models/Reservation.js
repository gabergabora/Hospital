const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    doctor: {
        type: String,
    },

    time:{
        type: Date,
        default: ""
    },

    isDone: {
        type: Number,
        default: 0,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const Reservation = mongoose.model("Reservation", reservationSchema, "Reservation")
module.exports = Reservation