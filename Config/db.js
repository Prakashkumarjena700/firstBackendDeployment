const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://Prakash:Prakash@cluster0.fzjtgrd.mongodb.net/nem111?retryWrites=true&w=majority")

module.exports = {
    connection
}
