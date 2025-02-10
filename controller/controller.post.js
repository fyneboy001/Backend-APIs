const postModel = require("../model/model.post");

const createPost = async (req, res) => {
  //using cookie to get the creator id
  const { id } = req.cookies;
  //requesting for the information(post that will be sent from the frontend)
  const body = req.body;

  //create a new user using try and catch
  try {
    const newPost = new postModel({ ...body, creatorId: id });
    await newPost.save();
    res.status(201).json("post created successfully");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

//get all post that was made to by all users
const getAllPost = async (req, res) => {
  try {
    const allPost = await postModel.find();
    return res.json(allPost);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

//get one post

const getOnePost = async (req, res) => {
  const { id } = req.params;
  try {
    //const onePost = await postModel.findById(req.params.id);
    const onePost = await postModel.findById(id);
    return res.cookie("id", getOnePost.id, { httpOnly: true }).json(onePost);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

//Delete post function
const deletePost = async (req, res) => {
  const { creatorId } = req.body;
  const { id } = req.params;
  try {
    //get the post to be deleted using the id
    const post = await postModel.findById(id);

    //check if post exist, else send error message to user
    if (!post) {
      return res.status(404).send("Post not found");
    }
    //check if the creatorid in the post matches the creator id passed from the body
    if (post.creatorId.toString() !== creatorId) {
      return res.status(403).send("this post does not belong to you");
    }

    await postModel.findByIdAndDelete(id);
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

//Update a post function
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { creatorId, id: postId, ...data } = req.body;

  try {
    //get the post to be updated using the id
    const Post = await postModel.findById(id);
    if (!Post) {
      return res.status(404).json("Post not found");
    }
    if (post.creatorId.toString() !== creatorId) {
      return res.status(403).json({ message: "Post does not belong to you" });
    }

    //Now update post
    await postModel.findByIdAndUpdate(id, { ...data }, { now: true });
    return res.status(200).json("Post updated successfully");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

module.exports = { createPost, getAllPost, getOnePost, deletePost, updatePost };
