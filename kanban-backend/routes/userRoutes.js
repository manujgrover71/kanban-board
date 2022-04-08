const express = require("express");
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require("../controllers/userController");

const routes = express.Router();

routes.route("/register").post(registerUser);
routes.route("/login").post(loginUser);

module.exports = routes;
