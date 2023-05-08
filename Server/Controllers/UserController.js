const User = require("../Models/User");

// @route GET api/user
// @desc Get all users
// @access Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/user/:id
// @desc Get user by ID
// @access Public
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/user
// @desc Create a user
// @access Private
exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({
      username,
      password
    });
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/user/auth
// @desc Authenticate a user
// @access Private
exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
