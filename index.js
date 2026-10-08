const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect")
const { checkForAuthentication, restrictTo } = require("./middleware/auth")

const {config} = require("dotenv")
config();

const url = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

app.use(express.static(path.join(__dirname, "public"))); 

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

connectToMongoDB(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/", staticRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);

// app.get("/favicon.ico", (req, res) => {
    //   res.sendFile(path.join(__dirname, "public", "favicon.ico"));
    // });
    app.get("/:shortId", async (req, res) => {
        const shortid = req.params.shortId;
    // console.log("logging shortid : \n", shortid)
    if(shortid == null)
        return res.json({ message: "shortid not provided" })
    // console.log(shortid);
    const entry = await url.findOneAndUpdate({
        shortid
    },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now(),
                }
            }
        });
    // console.log("logging entry : \n", entry);
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))