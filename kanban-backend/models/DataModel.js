const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  title: {
    type: String
  }
});

const ListSchema = new mongoose.Schema({
  user_id: { type: String },
  title: { type: String },
  cards: [CardSchema],
});

let ListModel = mongoose.model("listmodel", ListSchema);
let CardModel = mongoose.model("cardmodel", CardSchema);

module.exports = { ListModel, CardModel };