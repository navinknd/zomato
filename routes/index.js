const userRoute = require("./user.router");
var express = require('express')
let app = express();
// app.use("/education",educationRoute)
app.use("/user",userRoute)
module.exports = app