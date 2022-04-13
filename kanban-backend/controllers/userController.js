const { User } = require("../models/UserModel");
const { generateToken } = require("../utils/generateToken");

// @desc   Register User
// @route  POST /api/v1/users/register
// @access Public
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const userResponse = await User.findOne({ email });

    if (userResponse) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({ success: true, token_id: generateToken(user._id), _id: user._id, name, email });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Error in Registering - Please try after some time" });
  }
}

// @desc   Login User
// @route  POST /api/v1/users/login
// @access Public
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({ success: true, token_id: generateToken(user._id), _id: user._id, email });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid Email or Password" });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Error in Loggin In - Please try after some time" });
  }
}

module.exports = { registerUser, loginUser };
