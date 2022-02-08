const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", (err, success) => {
    if(err) console.log("error connection to db", err);
    else console.log("success connecting to db");
});