require('dotenv').config();
const mongoose = require("mongoose")
const uri = process.env.MONGO_URI

function connectDB() {
    // console.log(uri)
    mongoose.connect(uri)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err))
}
module.exports = { connectDB}