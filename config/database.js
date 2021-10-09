const mongoose = require("mongoose")
const MONGO_URI = "mongodb://localhost:27017/hospital";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if(error){
        console.log(error)
    } else {
        console.log("Database connected")
    }
})