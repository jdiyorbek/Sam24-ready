const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: String,
    text: String,
    description: String,
    type: String,
    img: String,
    view: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: new Date().getTime()
    }
})

const Article = mongoose.model("Article", articleSchema)

module.exports = Article