const mongooe = require("mongoose");

const userSchema = new mongooe.Schema({
    name: {
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
        unique:true,
    },
    role: {
        type: String,
        require: true,
        default: "NORMAL",
    },
    password:{
        type:String,
        require:true,
    }
}, { timestamps:true });

const user = mongooe.model("user", userSchema);

module.exports = user;