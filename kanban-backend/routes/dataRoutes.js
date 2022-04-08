const express = require("express");
const jwt = require("jsonwebtoken");

const routes = express.Router();
const {
  getData,
  addCard,
  updateList,
  deleteList,
  addList,
  deleteCard,
} = require("../controllers/dataController");

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

routes
  .route("/list/:id")
  .put(authenticationToken, updateList)
  .delete(authenticationToken, deleteList);

routes.route("/list").post(authenticationToken, addList);

routes
  .route("/card")
  .post(authenticationToken, addCard)
  .delete(authenticationToken, deleteCard);

routes.route("/").get(authenticationToken, getData);

module.exports = routes;
