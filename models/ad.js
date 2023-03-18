const mongoose = require("mongoose")

const adSchema = new mongoose.Schema({
    url: String,
    view: Number,
    img: String,
    viewed: {
        type: Number,
        default: 0,
    }
})

const Ad = mongoose.model("Ad", adSchema)

module.exports = Ad;