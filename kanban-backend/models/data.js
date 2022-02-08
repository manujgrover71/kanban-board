const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title : {type: String},
    cards: [{ title : { type: String } }]
})

const dataModel = mongoose.model("datamodel", listSchema);

dataModel.getData = function(req, callBack) {
    console.log("In dataModel getdata");
    dataModel.find({}, callBack);
};

dataModel.insertData = function(req, callBack) {
    // let details = req.body;
    console.log("Here ", req);
    dataModel.insertMany({ title: "Doing", cards: [{ title: "Something" }]  }, callBack);
}

module.exports = dataModel;