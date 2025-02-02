const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", user);

module.exports = userModel;
