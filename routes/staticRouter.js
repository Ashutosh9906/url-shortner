const express = require("express")
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");
const user = require("../models/user");

const router = express.Router();

router.get('/',restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id }).populate("createdBy", "name").exec();
    return res.render("home", {
        urls:allUrls,
    });
})

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ }).populate("createdBy", "name").exec();
    return res.render("home", {
        urls:allUrls,
    });
})


router.get("/signup", async(req, res) => {
    return res.render("signup");
})

router.get("/login", async(req, res) => {
    return res.render("login");
})

module.exports = router;