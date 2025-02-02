const express = require("express");
const route = express.Router();
const {
  createPost,
  getAllPost,
  getOnePost,
  deletePost,
  updatePost,
} = require("../controller/controller.post");

route.post("/post", createPost);
route.get("/post", getAllPost);
route.get("/post/:id", getOnePost);
route.delete("/post/:id", deletePost);
route.put("/post/:id", updatePost);

module.exports = route;
