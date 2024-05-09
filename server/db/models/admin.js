const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    // tasks:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Task"
    //     }
    // ]
});

module.exports = mongoose.model("Login",loginSchema)