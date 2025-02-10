const express = require("express");
//import express from "express"; if I'm to use import i need to include type:module in my package.json
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const userRoute = require("./route/route.user");
const postRoute = require("./route/route.post");
app.use(userRoute);
const cookieParser = require("cookie-parser");
app.use(cookieParser);

//connecting express application to mongodb
mongoose
  .connect(
    "mongodb+srv://fyneboyfynerose:5Pr0ZdMTtopSgxzt@foodieland.ettdm.mongodb.net/foodieland"
  )
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

//attaching the postRoute to the index.js
app.use(postRoute);

//listening to port 4000
app.listen(3000, () => {
  console.log("app is running");
});
