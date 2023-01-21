const express = require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./routes/user.routes")
const { noteRoutes } = require("./routes/note.Routes")
const { authenticate } = require("./Middlewares/authenticate.middleware")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("This is homepage")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRoutes)


app.listen(4500, async () => {
    try {
        await connection
        console.log("DB connected")
    }
    catch (err) {
        console.log(err)
    }
    console.log("Runing port at 4500")
})