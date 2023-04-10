const { validationResult } = require("express-validator");

const Customer = require("../Models/Customer");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

// @route   GET api/customers
// @desc    Get all customers
// @access  Public
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/customers/:id
// @desc    Get customer by ID
// @access  Public
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   POST api/customers
// @desc    Create a customer
// @access  Private
exports.createCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, address, phone, email } = req.body;
  try {
    const newCustomer = new Customer({
      name,
      address,
      phone,
      email,
    });
    const customer = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT api/customers/:id
// @desc    Update a customer
// @access  Private
exports.updateCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, address, phone, email } = req.body;
  const customerFields = {};
  if (name) customerFields.name = name;
  if (address) customerFields.address = address;
  if (phone) customerFields.phone = phone;
  if (email) customerFields.email = email;
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: customerFields },
      { new: true }
    );
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/customers/:id
// @desc    Delete a customer
// @access  Private
exports.deleteCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    await Customer.findByIdAndRemove(req.params.id);
    res.json({ msg: "Customer removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
