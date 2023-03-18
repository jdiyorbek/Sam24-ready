const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    type: String,
    fname: String,
    lname: String,
    login: String,
    password: String

})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin