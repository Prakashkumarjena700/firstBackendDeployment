const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: String,
    note: String,
    catagory: String,
    auther: String
})

const NoteModel = mongoose.model("notes", noteSchema)

module.exports = {
    NoteModel
}