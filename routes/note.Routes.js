const express = require("express")
const { NoteModel } = require("../Model/Notes.model")


const noteRoutes = express.Router()

noteRoutes.get("/", async (req, res) => {
    const notes = await NoteModel.find()
    res.send(notes)
    console.log(notes)
})

noteRoutes.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const note = new NoteModel(payload)
        await note.save()

        res.send("note created")
    } catch (err) {
        res.send("Error")
        console.log(err)
    }
})

noteRoutes.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body

    try {
        await NoteModel.findByIdAndUpdate({ _id: ID }, payload)
        res.send("Data has been Update")

    } catch (err) {
        res.send("Can't update")
        console.log(err)
    }
})

noteRoutes.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id
    try {
        await NoteModel.findByIdAndDelete({ _id: ID })
        res.send("Deleted Sucessfully")

    } catch (err) {
        res.send("Can't Delete")
    }
})

module.exports = {
    noteRoutes
}