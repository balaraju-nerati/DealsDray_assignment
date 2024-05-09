const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    f_Name:{
        type:String,
        required: true,
        unique: true
    },
    f_Email:{
        type:String,
        required: true,
        unique: true
    },
    f_Mobile:{
        type:Number,
        required: true
    },
    f_Designation:{
        type: String,
        required: true
    },
    f_Gender:{
        type: String,
        required: true
    },
    f_Course:{
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Employee",employeeSchema)