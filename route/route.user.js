const express = require("express");
const route = express.Router();
const {
  createUser,
  userLogin,
  deleteUser,
} = require("../controller/controller.user");

//CRUD operator
route.post("/user", createUser);
route.post("/login", userLogin);
route.delete("/user", deleteUser);

module.exports = route;
