const express = require("express");
const app = express();
const cors = require("cors");

const adminAPI = require("./routes/admin");
const employeeAPI = require("./routes/employee");
require("dotenv").config();
require("./db/dbConnect")

const PORT = 3000;

app.use(cors());
app.use(express.json())
app.use("/admin",adminAPI)
app.use("/employee",employeeAPI)

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})