const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    previewpix: {
      type: String,
      require: true,
    },
    previewVid: {
      type: String,
      require: true,
    },
    detailvid: {
      type: String,
      require: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
