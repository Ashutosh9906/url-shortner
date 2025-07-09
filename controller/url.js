const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    //console.log(body);
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid(8);

    await URL.create({
        shortid: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        id: shortID,
    })
}

async function handleGetAnalytics(req, res) {
    const shortid = req.params.shortId;
    const result = await URL.findOne({ shortid });
    return res.json({ totalClick: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};