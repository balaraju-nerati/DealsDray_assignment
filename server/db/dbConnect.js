const mongoose = require("mongoose")

const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Dealsdray-assignment",
        });
        console.log("Database connection successfull")
    } catch (error) {
        console.log("Error connecting Database", error)
    }
}

dbConnect();