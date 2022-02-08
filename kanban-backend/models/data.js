const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: { type: String },
  cards: [{ title: { type: String } }],
});

const dataModel = mongoose.model("datamodel", listSchema);

dataModel.getData = function (req, callBack) {
  console.log("In dataModel getdata");
  dataModel.find({}, callBack);
};

dataModel.insertData = function (req, callBack) {
  console.log("Here ", req);
  dataModel.insertMany(
    { title: "Doing", cards: [{ title: "Something" }] },
    callBack
  );
};

dataModel.addCard = function (req, callBack) {
  dataModel.findOneAndUpdate(
    { _id: req.id },
    { $push: { cards: { title: req.title } } },
    callBack
  );
};

dataModel.addList = function (req, callBack) {
  dataModel.insertMany([{ title: req.title }], callBack);
};

dataModel.updateListTitle = function (req, callBack) {
  dataModel.findOneAndUpdate(
    { _id: req.id },
    { $set: { title: req.listTitle } },
    callBack
  );
};

dataModel.addCardAtPosition = function (req, callBack) {
  dataModel.findOneAndUpdate(
    { _id: req.listId },
    {
      $push: {
        cards: { $each: [{ title: req.cardTitle }], $position: req.index },
      },
    },
    callBack
  );
};

dataModel.deleteCard = function (req, callBack) {
  dataModel.findOneAndUpdate(
    { _id: req.listId },
    { $pull: { cards: { _id: req.cardId } } },
    callBack
  );
};

dataModel.deleteList = function (req, callBack) {
  dataModel.deleteOne({ _id: req.listId }, callBack);
};

module.exports = dataModel;
