const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    username: {
        type: String,
    },

    doctor_name: {
        type: String
    },

    order_date: {
        type: Date,
        default: "",
    },

    Done: {
        type: Number,
        default: 0
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const Orders = mongoose.model("Orders", ordersSchema, "Orders")
module.exports = Orders