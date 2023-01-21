const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { UserModel } = require("../Model/user.model")

const express = require("express")

const userRouter = express.Router()



userRouter.post("/register", async (req, res) => {
    const { name, email, password, age } = req.body
    try {
        bcrypt.hash(password, 7, async (err, securepasword) => {
            if (err) {
                console.log(err)
            } else {
                const user = new UserModel({ name, email, password: securepasword, age })
                await user.save()
                res.send("Register Sucessfull")

            }
        });

    }
    catch (err) {
        console.log(err)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        console.log(user)

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ course: 'backend' }, 'masai')
                    res.send({ msg: "Login Sucessful", token: token })
                } else {
                    res.send("wrong Credential")
                }
            });
        } else {
            res.send("Wrong credentials")
        }
    }
    catch (err) {
        res.send("Wrong")
    }

})


userRouter.get("/cart", (req, res) => {

    const token = req.headers.authorization

    jwt.verify(token, 'masai', (err, decoded) => {
        if (err) {
            res.send("Invalid Token")
            res.send(err)
        } else {
            res.send("Welcome")
        }
    });

})

module.exports = {
    userRouter
}