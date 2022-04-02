const express = require("express");

const routes = express.Router();
const {
  getData,
  addCard,
  updateList,
  deleteList,
  addList,
  deleteCard
} = require("../controllers/dataController");

routes.route("/list/:id").put(updateList).delete(deleteList);
routes.route("/list").post(addList);
routes.route("/card").post(addCard).delete(deleteCard);
routes.route("/").get(getData);

module.exports = routes;
