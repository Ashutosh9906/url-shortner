const { v4: uuidv4 } = require("uuid")
const user = require("../models/user");
const { setUser, getUser } = require("../service/auth")

async function handleUserSignUp(req, res){
    const { name, email, password } = req.body;
    const newUser = await user.create({
        name,
        email,
        password,
    })
    const token = setUser(newUser);
    res.cookie("token", token);
    return res.redirect("/")
}

async function handleUserlogin(req, res){
    const { email, password } = req.body;
    const User = await user.findOne({ email, password })
    if(!User) return res.render("login", {
        error: "Invalid username or password",
    })

    const token = setUser(User);
    res.cookie("token", token);
    return res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserlogin,
}