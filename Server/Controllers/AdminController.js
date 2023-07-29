const Admin = require("../Models/Admin");

// @route GET api/admin
// @desc Get all admins
// @access Public

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET api/admin/:id
// @desc Get admin by ID
// @access Public
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/admin
// @desc Create an admin
// @access Private
exports.createAdmin = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newAdmin = new Admin({
      username,
      password,
      role
    });
    const admin = await newAdmin.save();
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST api/admin/auth
// @desc Authenticate an admin
// @access Private
exports.authenticateAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    if (admin.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
