const userModel = require("../model/model.user");
const bcrypt = require("bcryptjs");

//Create user function
const createUser = async (req, res) => {
  const { password, ...others } = req.body;
  const salt = bcrypt.genSaltSync(10);

  //Hash the salted password
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword);

  //Validate user by checcking if their email exist
  const checkUserEmail = await userModel.findOne({ email: others.email });
  if (checkUserEmail) {
    return res.json("User already exist");
  }

  //Creating the part of the createUser function that will save the information past from the frontend hence creating the user account

  try {
    const newUser = new userModel({ password: hashPassword, ...others });
    await newUser.save();
    return res.json("User account created successfully");
  } catch (error) {
    return res.json("Unable to create account");
  }
};

//function to login user
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  //Check if email and password matches
  if (!email || !password) {
    return res.json("provide valid credentials");
  }

  //Check if user has an account
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) {
    return res.json("User does not exist: Create an account");
  }

  //check if password is correct
  const checkPassword = bcrypt.compareSync(password, checkUser.password);
  console.log(checkPassword);
  if (!checkpassword) {
    return res.json("Invalid password");
  }

  //Return user's information
  return res.json(checkUser);
};

//Delete user function
const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userModel.findByIdAndDelete(id);
    res.send("User Account Deleted Successfully");
  } catch (error) {
    res.send("something went wrong");
  }
};

//Getting a single user
const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    //const onePost = await postModel.findById(req.params.id);
    const oneUser = await userModel.findById(id);
    return res.json(oneUser);
  } catch (error) {
    res.send("something went wrong");
  }
};

module.exports = { createUser, userLogin, deleteUser, getOneUser };
