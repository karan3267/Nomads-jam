const express = require("express");
const { getToken } = require("../utils/common")
const User = require("../models/User")
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, firstName, lastName, userName } = req.body;
    const newUser = await User.findOne({ email: email })
    if (newUser) {
        return res
            .status(403)
            .json({ error: "A User with the email already exists" })
    }

    // const hashedPassword = bcrypt.hash(password,10)
    const newUserData = { email, password, firstName, lastName, userName }
    const registerNewUser = await User.create(newUserData);
    const token = await getToken(email, registerNewUser)
    const userToken = { ...registerNewUser.toJSON(), token }
    delete userToken.password
    return res.status(200).json(userToken)
})

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    let user = await User.findOne({ email: email })
    if (!user) {
        return res
            .status(403)
            .json({ error: "invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res
            .status(403)
            .json({ error: "invalid credentials" })
    }
    const token = await getToken(user.email, user)
    const userToken = { ...user.toJSON(), token }
    delete userToken.password
    return res.status(200).json(userToken)

})

module.exports = router;